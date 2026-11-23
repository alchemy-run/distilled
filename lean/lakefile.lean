import Lake
open Lake DSL

package distilled

@[default_target]
lean_lib Distilled

/-- The generator: reads a Smithy model and writes a Lean module. -/
lean_exe «distilled-gen» where
  root := `Generate

/-- Checks of the HTTPS client and the signer against known answers and live servers. -/
lean_exe «distilled-check» where
  root := `Check

target net.o pkg : System.FilePath := do
  let oFile := pkg.buildDir / "c" / "net.o"
  let srcJob ← inputTextFile <| pkg.dir / "c" / "net.c"
  let weakArgs := #["-I", (← getLeanIncludeDir).toString]
  buildO oFile srcJob weakArgs #["-fPIC", "-O2"] "cc" getLeanTrace

extern_lib libdistillednet pkg := do
  let name := nameToStaticLib "distillednet"
  let o ← net.o.fetch
  buildStaticLib (pkg.staticLibDir / name) #[o]
