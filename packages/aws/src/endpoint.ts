import * as ServiceMap from "effect/ServiceMap";

export class Endpoint extends ServiceMap.Service<Endpoint, string>()(
  "AWS::Endpoint",
) {}
