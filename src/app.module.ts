import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogController } from './endpoints/catalog/catalog.controller';
import { CatalogService } from './endpoints/catalog/catalog.service';
import { MovieController } from './endpoints/movie/movie.controller';
import { MovieService } from './endpoints/movie/movie.service';
import { AuthController } from './endpoints/auth/auth.controller';
import { AuthService } from './endpoints/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserController } from './endpoints/user/user.controller';
import { UserService } from './endpoints/user/user.service';
import { ProfileController } from './endpoints/profile/profile.controller';
import { ProfileService } from './endpoints/profile/profile.service';
import { BookmarksController } from './endpoints/bookmarks/bookmarks.controller';
import { BookmarksService } from './endpoints/bookmarks/bookmarks.service';
import { SearchController } from './endpoints/search/search.controller';
import { SearchService } from './endpoints/search/search.service';


@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '15d'}  
  }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads/'
  })] ,
  controllers: [AppController, MovieController,  /* CatalogController, AuthController, UserController, ProfileController, BookmarksController, SearchController */],
  providers: [AppService, MovieService,/*  CatalogService, AuthService, UserService, ProfileService, BookmarksService, SearchService */],
})
export class AppModule {}


