/** Virtual modules provided by `build/plugin.ts`; one slice per page. */
declare module "site:home" {
  const data: import("../build/site-data.ts").HomeData;
  export default data;
}
declare module "site:shame" {
  const data: import("../build/site-data.ts").ShameData;
  export default data;
}
declare module "site:bench" {
  const data: import("../build/site-data.ts").BenchData;
  export default data;
}
