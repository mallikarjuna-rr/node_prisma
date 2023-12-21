import { prisma } from '../../prisma/prisma';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { CSRequest } from 'requesttypes';
import { addCookie } from '../utils/http-cookie';
import { generateToken } from '../utils/jwt-token';
import { logger } from '../utils/logger';
import { checkSignupSchema, checkLoginSchema } from '../utils/schema-validator/user-schema-validator';
import { User } from 'user';
import { HTTPStatus, ResponseStatus } from 'responsetypes';


export const userSignUp = async (req: CSRequest, res: Response) =>  {
  try {

    const payload = req.body;
    const isSchemaValid = await checkSignupSchema(payload);
    if (!isSchemaValid) {
      logger.error('Invalid Schema')
      res.status(<HTTPStatus>400).send({
        status: <ResponseStatus>'FAILURE',
        error: 'Invalid Schema'
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        username: payload.username
      } as any
    });

    if (existingUser) {
      logger.error('User with this username already exist')
      res.status(<HTTPStatus>400).send({
        status: <ResponseStatus>'FAILURE',
        error: 'User with this username already exist'
      });
    }

    const user = await prisma.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        email: payload.email,
        password: payload.password,
        age: payload.age,
        address: payload?.address
      } as any
    });
    logger.info(user)
    res.status(<HTTPStatus>200).send({
      status: <ResponseStatus>'SUCCESS',
      data: user
    });
  } catch (err) {
    logger.error(err)
    res.status(<HTTPStatus>500).send({
      status: <ResponseStatus>'FAILURE',
      error: err
    });
  }
};

export const userLogin = async (req: CSRequest, res: Response) => {
  try {
    const payload = req.body;
    const { username, password } = payload;
    const isSchemaValid = await checkLoginSchema(payload);
    if (!isSchemaValid) {
      logger.error('Invalid Schema')
      return res.status(<HTTPStatus>400).send({
        status: <ResponseStatus>'FAILURE',
        error: 'Invalid Schema'
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        username: payload.username
      } as any
    }) as User;

    if (user.username === username && user.password === password) {
      const accessToken = await generateToken(user);
      await addCookie(res, 'JWT_Token', accessToken, req?.hostname, true);
      logger.info(user)
      return res.status(<HTTPStatus>200).send({
        status: <ResponseStatus>'SUCCESS',
        data: {
          JWT_Token: accessToken,
          user: user
        }
      })
    }
    logger.error('Invalid username/password')
    return res.status(<HTTPStatus>400).send({
      status: <ResponseStatus>'FAILURE',
      error: 'Invalid username/password'
    });
  } catch (err) {
    logger.error(err)
    return res.status(<HTTPStatus>500).send({
      status: <ResponseStatus>'FAILURE',
      error: err
    });
  }
};

export const getUser = async (req: CSRequest, res: Response) => { 
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      } as any
    });
    if (!user) {
      logger.error('User not found')
      return res.status(<HTTPStatus>404).send({
        status: <ResponseStatus>'FAILURE',
        error: 'User not found'
      });
    }
    logger.info(user)
    return res.status(<HTTPStatus>200).send({
      status: <ResponseStatus>'SUCCESS',
      data: user
    });
  } catch (err) {
    logger.error(err)
    return res.status(<HTTPStatus>500).send({
      status: <ResponseStatus>'FAILURE',
      error: err
    });
  }
}