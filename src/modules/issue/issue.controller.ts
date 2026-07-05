import type { Request, Response } from "express";

const createIssue = async (req: Request, res: Response) => {};

const getAllIssue = async (req: Request, res: Response) => {};

const getSingleIssue = async (req: Request, res: Response) => {};

const updateIssue = async (req: Request, res: Response) => {};

const deleteIssue = async (req: Request, res: Response) => {};

const issueControllers = {
  createIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};

export default issueControllers;
