#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import readline from "node:readline";
import fs from "fs";

const execAsync = promisify(exec);

const rl = readline.promises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

  const answer = await rl.question("Add to PHPStorm Directory Mappings? Y/n ");

  if (answer.toLowerCase() === "n") {
    return;
  }

  const vcsPath = ".idea/vcs.xml";

  const vcsContent = fs.readFileSync(vcsPath, "utf-8");

  const vcsContentWithRepo = vcsContent.replace(
    "</component>",
    `  <mapping directory="$PROJECT_DIR$/${repoPath}" vcs="Git" />
  </component>`
  );

  fs.writeFileSync(vcsPath, vcsContentWithRepo);

  console.log(`Added Directory Mappings for: ${repoPath}`);
};

main()
  .catch((error) => console.error(error.message))
  .finally(() => rl.close());
