# Verification Skill

## Constraints
- CRITICAL: You are strictly FORBIDDEN from using the integrated browser subagent, opening `localhost`, or using any visual debugging tools.
- DO NOT execute `npm run dev` or `next dev`.

## Allowed Verification Workflow
- To verify Next.js code correctness, you must ONLY use static analysis.
- Run `npm run build` or `npx tsc` in the terminal to verify.
- Rely entirely on TypeScript compilation errors and the Next.js build output logs. If the build succeeds, consider the task complete.