import { bash } from "../tool/bash.ts";
import { edit } from "../tool/edit.ts";
import { glob } from "../tool/glob.ts";
import { grep } from "../tool/grep.ts";
import { read } from "../tool/read.ts";
import { readlints } from "../tool/readlints.ts";
import { Toolkit } from "./toolkit.ts";
// import { task } from "./task.ts";
// import { todo } from "./todo.ts";
import { write } from "../tool/write.ts";

export class Coding extends Toolkit("Coding")`
A set of tools for reading, writing, and editing code:

- ${bash}
- ${readlints}
- ${edit}
- ${glob}
- ${grep}
- ${read}
- ${write}
` {}
