import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import BlogPost, { IBlogPost } from '../models/blog-post.model';
import { blogPostSchema, BlogPostInput } from '../validations/blog-post.valiadtion';
import { ValidationError, NotFoundError, handleError } from '../utils/error-handling';

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const posts: IBlogPost[] = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    handleError(error, res);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validatedData: BlogPostInput = blogPostSchema.parse(req.body);
    const newPost: IBlogPost = new BlogPost(validatedData);
    const savedPost: IBlogPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error instanceof ZodError) {
      handleError(new ValidationError('Validation failed', error.errors), res);
    } else {
      handleError(error, res);
    }
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const post: IBlogPost | null = await BlogPost.findById(req.params.id);
    if (!post) {
      throw new NotFoundError('Post not found');
    }
    res.status(200).json(post);
  } catch (error) {
    handleError(error, res);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validatedData: BlogPostInput = blogPostSchema.parse(req.body);
    const updatedPost: IBlogPost | null = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { ...validatedData, updatedAt: Date.now() },
      { new: true, runValidators: true },
    );
    if (!updatedPost) {
      throw new NotFoundError('Post not found');
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof ZodError) {
      handleError(new ValidationError('Validation failed', error.errors), res);
    } else {
      handleError(error, res);
    }
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const deletedPost: IBlogPost | null = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      throw new NotFoundError('Post not found');
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    handleError(error, res);
  }
};
