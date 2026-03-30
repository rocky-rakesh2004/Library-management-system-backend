import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistedToken } from './blacklist.entity';
import { Repository, LessThan } from 'typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private blacklistRepo: Repository<BlacklistedToken>,
  ) {}

  async addToken(token: string) {
    return this.blacklistRepo.save({ token });
  }

  async isBlacklisted(token: string) {
    return this.blacklistRepo.findOne({
      where: { token },
    });
  }
  @Cron('0 0 * * *')
  async removeExpiredTokens() {
    const oneDayAgo = new Date();

    oneDayAgo.setDate(
      oneDayAgo.getDate() - 1,
    );

    await this.blacklistRepo.delete({
      createdAt: LessThan(oneDayAgo),
    });

    console.log(
      'Old blacklist tokens removed',
    );
  }
}