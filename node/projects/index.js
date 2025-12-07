#!/usr/bin/env node

import { count } from "./utils.js";

//default import - will take whatever the default export of the module is
import asdf from "./utils.js";

// or can also do the below
// import asdf,{count} from "./utils.js"

//we are not naming the file location, since it's an internal module
import fs from "fs";
//import fs from "node:fs";

const note = process.argv[2];
const newNote = {
  content: note,
  id: Date.now(),
};

console.log(asdf, count, fs);

console.log(newNote);
