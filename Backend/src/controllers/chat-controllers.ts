import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import { configureOpenAi } from '../config/openai-config.js';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: 'User not available' });
    }

    // Retrieve all stored chats from the user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ role: 'user', content: message });

    user.chats.push({ role: 'user', content: message });

    // Send all chat records to OpenAI
    const config = configureOpenAi();
    const openai = new OpenAIApi(config);

    // get the latest response
    const chatResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Eh issues with OpenAI API - fixes' });
  }
};
