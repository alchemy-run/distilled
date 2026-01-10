# Error Discovery Task

You are working on discovering missing AWS errors for the **{SERVICE}** service.

Follow the workflow in `CLAUDE.md`. Your goal is to achieve convergence: all operations have their expected error types documented in `spec/{service}.json`.

## Starting Point

```bash
# Check current coverage
cat spec/{service}.json | jq '.operations | keys | length'

# Run discovery with dry-run first
bun find --dry-run {service}

# Then run actual discovery
bun find --type delete {service}
bun find --type read {service}
bun find {service}
```

## Your Loop

1. **Run discovery** → See what errors are found
2. **Analyze results** → Look for Malformed errors (missing ID prefixes), new error patterns
3. **Improve tools** → Add prefixes to `id-generator.ts`, add skip rules to `runner.ts`
4. **Test changes** → `bun test:scripts`
5. **Regenerate SDK** → `bun generate --sdk {service}`
6. **Repeat** → Until 0 new errors discovered

## When You See Malformed Errors

A `Malformed` error means the fake ID format is wrong. Fix it:

1. Find the resource name from the error (e.g., `InvalidVpnGatewayID.Malformed` → `VpnGateway`)
2. Look up the correct prefix (AWS docs or error message hints)
3. Add to `scripts/find-errors/id-generator.ts` in `AWS_ID_PREFIXES`
4. Add a test to `scripts/find-errors/id-generator.test.ts`
5. Run `bun test:scripts` to verify

## Cleanup

If you create real resources, clean them up:

```bash
bun clean:aws {service} --dry-run  # Preview first
bun clean:aws {service}            # Then clean
```

## Commit When Done

```bash
git add spec/{service}.json
git commit -m "feat: add discovered errors for {service}"

# If you improved tools
git add scripts/find-errors/
git commit -m "fix: add {Resource} ID prefix to id-generator"
```

## Success Criteria

- `bun find {service}` returns 0 new errors
- No Malformed errors indicating missing prefixes
- All delete operations have NotFound/Malformed errors
- All read operations have NotFound/NoSuch errors
