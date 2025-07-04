import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import isEmail from 'validator/lib/isEmail';
import { AppDataSource } from 'src/entity/connect';
import { User } from 'src/entity/user';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { CreateUser, getUserData } from './dto/create-user';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/entity/user-dependencies/roles';
import { generateToken, loginData } from './dto/login-user';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }
/* 
    async login(data: loginData) {
        const userRepo = AppDataSource.getRepository(User)
     

        if (!user) return { message: 'Пользователь под такими email уже существует!', status: 400 }

        const valid_pass = bcrypt.compareSync(data.password, user.password)
        console.log(valid_pass);
        if (!valid_pass) return { message: 'Пароль введён неверно!', status: 400 }

        const tokens = await this.generateTokens({ id: user.id, email: user.email })
    
      
        userRepo.save(user)
        return tokens
    }

    async signUp(data: getUserData) {
        if (!isEmail(data.email)) return { message: 'Введён некорректный email адрес!', status: 400 }

        const candidate = await (AppDataSource.getRepository(User)).findOneBy({ email: data.email })
        if (candidate) {
            return { message: 'Пользователь под такими email уже существует!', status: 400 }
        }

        const user: CreateUser = {
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: bcrypt.hashSync(data.password, 7)
        }

        if (data.photoUrl) {
            user.photo = data.photoUrl
        }

        const userRepo = AppDataSource.getRepository(User)
        const rolesRepo = AppDataSource.getRepository(Role)
        const role = await rolesRepo.findOne({ where: { name: 'user' }, relations: ['users'] })
        console.log(role);
        const createUser = userRepo.create(user)

        if (role) createUser.roles = [role]

        const saveUser = await userRepo.save(createUser);


        role?.users.push(saveUser)

        if (role) await rolesRepo.save(role)



        throw new HttpException('Регистрация прошла успешно', HttpStatus.OK)

    }


    async generateTokens(user: generateToken) {

        const accesToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
        }, { secret: process.env.JWT_SECRET, expiresIn: '15m' })

        const refreshToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
         
        }, { secret: process.env.JWT_SECRET })



        return { access: `Bearer ${accesToken}`, refresh: `Bearer ${refreshToken}` }
    } */
}
