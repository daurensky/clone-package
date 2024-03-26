#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec)

const main = async () => {
  const repoUrl = process.argv[2];

  if (!repoUrl) {
    throw new Error("Repo url not provided");
  }

  let repoName = repoUrl.split("/")[1];

  if (!repoName) {
    throw new Error(`Invalid repo url: ${repoUrl}`);
  }

  if (repoName.includes(".git")) {
    repoName = repoName.replace(".git", "");
  }

  const repoPath = `composer-packages/ibecsystems/${repoName}`;

  await execAsync(`git clone ${repoUrl} ${repoPath}`);

  console.log(`Cloned to ${repoPath}`);
};

main().catch((error) => console.error(error.message));
