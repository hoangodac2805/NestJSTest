import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/typeorm/entities/User.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { RefreshToken } from 'src/database/typeorm/entities/Refresh-token.entity';
import { HandleDBError } from 'src/common/decorators/handleDBErrors.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
    public jwtService: JwtService,
  ) { }


  @HandleDBError()
  async register(registerDto: RegisterDto): Promise<User> {
    const { email, password, userName } = registerDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      userName,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = uuidv4();

    const refreshTokenEntity = this.refreshTokenRepo.create({
      user,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.refreshTokenRepo.save(refreshTokenEntity);

    return refreshToken;
  }

  async getRefreshToken(token: string): Promise<RefreshToken | null> {
    const tokenEntity = await this.refreshTokenRepo.findOne({
      where: { token },
      relations: {
        user: true,
      },
    });

    return tokenEntity;
  }

  async revokeToken(token: string): Promise<void> {
    const tokenEntity = await this.refreshTokenRepo.findOne({
      where: { token },
    });

    if (tokenEntity) {
      tokenEntity.revoked = true;
      await this.refreshTokenRepo.save(tokenEntity);
    }
  }

}
