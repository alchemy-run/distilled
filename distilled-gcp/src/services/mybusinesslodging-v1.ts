// ==========================================================================
// My Business Lodging API (mybusinesslodging v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "mybusinesslodging",
  version: "v1",
  rootUrl: "https://mybusinesslodging.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LodgingMetadata {
  /** Required. The latest time at which the Lodging data is asserted to be true in the real world. This is not necessarily the time at which the request is made. */
  updateTime?: string;
}

export const LodgingMetadata: Schema.Schema<LodgingMetadata> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "LodgingMetadata" }) as any as Schema.Schema<LodgingMetadata>;

export interface Activities {
  /** Tennis exception. */
  tennisException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free bicycle rental. The hotel owns bicycles that it permits guests to borrow and use for free. */
  freeBicycleRental?: boolean;
  /** Golf. There is a golf course on hotel grounds or there is a nearby, independently run golf course that allows use by hotel guests. Can be free or for a fee. */
  golf?: boolean;
  /** Private beach exception. */
  privateBeachException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Casino. A space designated for gambling and gaming featuring croupier-run table and card games, as well as electronic slot machines. May be on hotel premises or located nearby. */
  casino?: boolean;
  /** Beach front exception. */
  beachFrontException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Boutique stores exception. */
  boutiqueStoresException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Nightclub. There is a room at the hotel with a bar, a dance floor, and seating where designated staffers play dance music. There may also be a designated area for the performance of live music, singing and comedy acts. */
  nightclub?: boolean;
  /** Snorkeling exception. */
  snorkelingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free Watercraft rental exception. */
  freeWatercraftRentalException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Beach access. The hotel property is in close proximity to a beach and offers a way to get to that beach. This can include a route to the beach such as stairs down if hotel is on a bluff, or a short trail. Not the same as beachfront (with beach access, the hotel's proximity is close to but not right on the beach). */
  beachAccess?: boolean;
  /** Watercraft rental. The hotel owns water vessels that it permits guests to borrow and use. Can be free or for a fee. Watercraft may include boats, pedal boats, rowboats, sailboats, powerboats, canoes, kayaks, or personal watercraft (such as a Jet Ski). */
  watercraftRental?: boolean;
  /** Tennis. The hotel has the requisite court(s) on site or has an affiliation with a nearby facility for the purpose of providing guests with the opportunity to play a two-sided court-based game in which players use a stringed racquet to hit a ball across a net to the side of the opposing player. The court can be indoors or outdoors. Instructors, racquets and balls may or may not be provided. */
  tennis?: boolean;
  /** Horseback riding exception. */
  horsebackRidingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free watercraft rental. The hotel owns watercraft that it permits guests to borrow and use for free. */
  freeWatercraftRental?: boolean;
  /** Golf exception. */
  golfException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Watercraft rental exception. */
  watercraftRentalException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Private beach. The beach which is in close proximity to the hotel is open only to guests. */
  privateBeach?: boolean;
  /** Casino exception. */
  casinoException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bicycle rental exception. */
  bicycleRentalException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Breach front. The hotel property is physically located on the beach alongside an ocean, sea, gulf, or bay. It is not on a lake, river, stream, or pond. The hotel is not separated from the beach by a public road allowing vehicular, pedestrian, or bicycle traffic. */
  beachFront?: boolean;
  /** Water skiing exception. */
  waterSkiingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Snorkeling. The provision for guests to participate in a recreational water activity in which swimmers wear a diving mask, a simple, shaped breathing tube and flippers/swim fins for the purpose of exploring below the surface of an ocean, gulf or lake. Does not usually require user certification or professional supervision. Equipment may or may not be available for rent or purchase. Not scuba diving. */
  snorkeling?: boolean;
  /** Game room. There is a room at the hotel containing electronic machines for play such as pinball, prize machines, driving simulators, and other items commonly found at a family fun center or arcade. May also include non-electronic games like pool, foosball, darts, and more. May or may not be designed for children. Also known as arcade, fun room, or family fun center. */
  gameRoom?: boolean;
  /** Scuba. The provision for guests to dive under naturally occurring water fitted with a self-contained underwater breathing apparatus (SCUBA) for the purpose of exploring underwater life. Apparatus consists of a tank providing oxygen to the diver through a mask. Requires certification of the diver and supervision. The hotel may have the activity at its own waterfront or have an affiliation with a nearby facility. Required equipment is most often supplied to guests. Can be free or for a fee. Not snorkeling. Not done in a swimming pool. */
  scuba?: boolean;
  /** Nightclub exception. */
  nightclubException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Scuba exception. */
  scubaException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Beach access exception. */
  beachAccessException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water skiing. The provision of giving guests the opportunity to be pulled across naturally occurring water while standing on skis and holding a tow rope attached to a motorboat. Can occur on hotel premises or at a nearby waterfront. Most often performed in a lake or ocean. */
  waterSkiing?: boolean;
  /** Horseback riding. The hotel has a horse barn onsite or an affiliation with a nearby barn to allow for guests to sit astride a horse and direct it to walk, trot, cantor, gallop and/or jump. Can be in a riding ring, on designated paths, or in the wilderness. May or may not involve instruction. */
  horsebackRiding?: boolean;
  /** Game room exception. */
  gameRoomException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Boutique stores. There are stores selling clothing, jewelry, art and decor either on hotel premises or very close by. Does not refer to the hotel gift shop or convenience store. */
  boutiqueStores?: boolean;
  /** Bicycle rental. The hotel owns bicycles that it permits guests to borrow and use. Can be free or for a fee. */
  bicycleRental?: boolean;
  /** Free bicycle rental exception. */
  freeBicycleRentalException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Activities: Schema.Schema<Activities> = Schema.suspend(() => Schema.Struct({
  tennisException: Schema.optional(Schema.String),
  freeBicycleRental: Schema.optional(Schema.Boolean),
  golf: Schema.optional(Schema.Boolean),
  privateBeachException: Schema.optional(Schema.String),
  casino: Schema.optional(Schema.Boolean),
  beachFrontException: Schema.optional(Schema.String),
  boutiqueStoresException: Schema.optional(Schema.String),
  nightclub: Schema.optional(Schema.Boolean),
  snorkelingException: Schema.optional(Schema.String),
  freeWatercraftRentalException: Schema.optional(Schema.String),
  beachAccess: Schema.optional(Schema.Boolean),
  watercraftRental: Schema.optional(Schema.Boolean),
  tennis: Schema.optional(Schema.Boolean),
  horsebackRidingException: Schema.optional(Schema.String),
  freeWatercraftRental: Schema.optional(Schema.Boolean),
  golfException: Schema.optional(Schema.String),
  watercraftRentalException: Schema.optional(Schema.String),
  privateBeach: Schema.optional(Schema.Boolean),
  casinoException: Schema.optional(Schema.String),
  bicycleRentalException: Schema.optional(Schema.String),
  beachFront: Schema.optional(Schema.Boolean),
  waterSkiingException: Schema.optional(Schema.String),
  snorkeling: Schema.optional(Schema.Boolean),
  gameRoom: Schema.optional(Schema.Boolean),
  scuba: Schema.optional(Schema.Boolean),
  nightclubException: Schema.optional(Schema.String),
  scubaException: Schema.optional(Schema.String),
  beachAccessException: Schema.optional(Schema.String),
  waterSkiing: Schema.optional(Schema.Boolean),
  horsebackRiding: Schema.optional(Schema.Boolean),
  gameRoomException: Schema.optional(Schema.String),
  boutiqueStores: Schema.optional(Schema.Boolean),
  bicycleRental: Schema.optional(Schema.Boolean),
  freeBicycleRentalException: Schema.optional(Schema.String),
})).annotate({ identifier: "Activities" }) as any as Schema.Schema<Activities>;

export interface LivingAreaSleeping {
  /** King beds count. The number of large beds measuring 76"W x 80"L (193cm x 102cm). Most often meant to accompany two people. Includes California king and super king. */
  kingBedsCount?: number;
  /** Sofa beds count exception. */
  sofaBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Memory foam pillows. The option for guests to obtain bed pillows that are stuffed with a man-made foam that responds to body heat by conforming to the body closely, and then recovers its shape when the pillow cools down. */
  memoryFoamPillows?: boolean;
  /** Single or twin count beds. The number of smaller beds measuring 38"W x 75"L (97cm x 191cm) that can accommodate one adult. */
  singleOrTwinBedsCount?: number;
  /** Roll away beds count exception. */
  rollAwayBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Synthetic pillows exception. */
  syntheticPillowsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Beds count exception. */
  bedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Queen beds count exception. */
  queenBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Beds count. The number of permanent beds present in a guestroom. Does not include rollaway beds, cribs or sofabeds. */
  bedsCount?: number;
  /** Double beds count. The number of medium beds measuring 53"W x 75"L (135cm x 191cm). Also known as full size bed. */
  doubleBedsCount?: number;
  /** Double beds count exception. */
  doubleBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Feather pillows exception. */
  featherPillowsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bunk beds count exception. */
  bunkBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Other beds count exception. */
  otherBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bunk beds count. The number of furniture pieces in which one framed mattress is fixed directly above another by means of a physical frame. This allows one person(s) to sleep in the bottom bunk and one person(s) to sleep in the top bunk. Also known as double decker bed. */
  bunkBedsCount?: number;
  /** Hypoallergenic bedding exception. */
  hypoallergenicBeddingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Queen beds count. The number of medium-large beds measuring 60"W x 80"L (152cm x 102cm). */
  queenBedsCount?: number;
  /** Synthetic pillows. The option for guests to obtain bed pillows stuffed with polyester material crafted to reproduce the feel of a pillow stuffed with down and feathers. */
  syntheticPillows?: boolean;
  /** Memory foam pillows exception. */
  memoryFoamPillowsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** King beds count exception. */
  kingBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Single or twin beds count exception. */
  singleOrTwinBedsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Other beds count. The number of beds that are not standard mattress and boxspring setups such as Japanese tatami mats, trundle beds, air mattresses and cots. */
  otherBedsCount?: number;
  /** Hypoallergenic bedding. Bedding such as linens, pillows, mattress covers and/or mattresses that are made of materials known to be resistant to allergens such as mold, dust and dander. */
  hypoallergenicBedding?: boolean;
  /** Feather pillows. The option for guests to obtain bed pillows that are stuffed with the feathers and down of ducks or geese. */
  featherPillows?: boolean;
  /** Cribs count. The number of small beds for an infant or toddler that the guestroom can obtain. The bed is surrounded by a high railing to prevent the child from falling or climbing out of the bed */
  cribsCount?: number;
  /** Roll away beds count. The number of mattresses on wheeled frames that can be folded in half and rolled away for easy storage that the guestroom can obtain upon request. */
  rollAwayBedsCount?: number;
  /** Sofa beds count. The number of specially designed sofas that can be made to serve as a bed by lowering its hinged upholstered back to horizontal position or by pulling out a concealed mattress. */
  sofaBedsCount?: number;
  /** Cribs count exception. */
  cribsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const LivingAreaSleeping: Schema.Schema<LivingAreaSleeping> = Schema.suspend(() => Schema.Struct({
  kingBedsCount: Schema.optional(Schema.Number),
  sofaBedsCountException: Schema.optional(Schema.String),
  memoryFoamPillows: Schema.optional(Schema.Boolean),
  singleOrTwinBedsCount: Schema.optional(Schema.Number),
  rollAwayBedsCountException: Schema.optional(Schema.String),
  syntheticPillowsException: Schema.optional(Schema.String),
  bedsCountException: Schema.optional(Schema.String),
  queenBedsCountException: Schema.optional(Schema.String),
  bedsCount: Schema.optional(Schema.Number),
  doubleBedsCount: Schema.optional(Schema.Number),
  doubleBedsCountException: Schema.optional(Schema.String),
  featherPillowsException: Schema.optional(Schema.String),
  bunkBedsCountException: Schema.optional(Schema.String),
  otherBedsCountException: Schema.optional(Schema.String),
  bunkBedsCount: Schema.optional(Schema.Number),
  hypoallergenicBeddingException: Schema.optional(Schema.String),
  queenBedsCount: Schema.optional(Schema.Number),
  syntheticPillows: Schema.optional(Schema.Boolean),
  memoryFoamPillowsException: Schema.optional(Schema.String),
  kingBedsCountException: Schema.optional(Schema.String),
  singleOrTwinBedsCountException: Schema.optional(Schema.String),
  otherBedsCount: Schema.optional(Schema.Number),
  hypoallergenicBedding: Schema.optional(Schema.Boolean),
  featherPillows: Schema.optional(Schema.Boolean),
  cribsCount: Schema.optional(Schema.Number),
  rollAwayBedsCount: Schema.optional(Schema.Number),
  sofaBedsCount: Schema.optional(Schema.Number),
  cribsCountException: Schema.optional(Schema.String),
})).annotate({ identifier: "LivingAreaSleeping" }) as any as Schema.Schema<LivingAreaSleeping>;

export interface Pets {
  /** Cats allowed. Domesticated felines are permitted at the property and allowed to stay in the guest room of their owner. May or may not require a fee. */
  catsAllowed?: boolean;
  /** Pets allowed free. Household animals are allowed at the property and in the specific guest room of their owner for free. May or may not include dogs, cats, reptiles, and/or fish. */
  petsAllowedFree?: boolean;
  /** Cats allowed exception. */
  catsAllowedException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Pets allowed free exception. */
  petsAllowedFreeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Pets allowed. Household animals are allowed at the property and in the specific guest room of their owner. May or may not include dogs, cats, reptiles and/or fish. May or may not require a fee. Service animals are not considered to be pets, so not governed by this policy. */
  petsAllowed?: boolean;
  /** Pets allowed exception. */
  petsAllowedException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Dogs allowed. Domesticated canines are permitted at the property and allowed to stay in the guest room of their owner. May or may not require a fee. */
  dogsAllowed?: boolean;
  /** Dogs allowed exception. */
  dogsAllowedException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Pets: Schema.Schema<Pets> = Schema.suspend(() => Schema.Struct({
  catsAllowed: Schema.optional(Schema.Boolean),
  petsAllowedFree: Schema.optional(Schema.Boolean),
  catsAllowedException: Schema.optional(Schema.String),
  petsAllowedFreeException: Schema.optional(Schema.String),
  petsAllowed: Schema.optional(Schema.Boolean),
  petsAllowedException: Schema.optional(Schema.String),
  dogsAllowed: Schema.optional(Schema.Boolean),
  dogsAllowedException: Schema.optional(Schema.String),
})).annotate({ identifier: "Pets" }) as any as Schema.Schema<Pets>;

export interface LivingAreaFeatures {
  /** Private bathroom. A bathroom designated for the express use of the guests staying in a specific guestroom. */
  privateBathroom?: boolean;
  /** TV exception. */
  tvCastingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Shower exception. */
  showerException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** TV streaming exception. */
  tvStreamingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Dryer exception. */
  dryerException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Fireplace. A framed opening (aka hearth) at the base of a chimney in which logs or an electrical fire feature are burned to provide a relaxing ambiance or to heat the room. Often made of bricks or stone. */
  fireplace?: boolean;
  /** Fireplace exception. */
  fireplaceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Electronic room key exception. */
  electronicRoomKeyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Hairdryer. A handheld electric appliance that blows temperature-controlled air for the purpose of drying wet hair. Can be mounted to a bathroom wall or a freestanding device stored in the guestroom's bathroom or closet. */
  hairdryer?: boolean;
  /** In-unit safe. A strong fireproof cabinet with a programmable lock, used for the protected storage of valuables in a guestroom. Often built into a closet. */
  inunitSafe?: boolean;
  /** TV casting. A television equipped with a device through which the video entertainment accessed on a personal computer, phone or tablet can be wirelessly delivered to and viewed on the guestroom's television. */
  tvCasting?: boolean;
  /** Electronic room key. A card coded by the check-in computer that is read by the lock on the hotel guestroom door to allow for entry. */
  electronicRoomKey?: boolean;
  /** Private bathroom exception. */
  privateBathroomException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** TV. A television is available in the guestroom. */
  tv?: boolean;
  /** Toilet exception. */
  toiletException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Ironing equipment. A device, usually with a flat metal base, that is heated to smooth, finish, or press clothes and a flat, padded, cloth-covered surface on which the clothes are worked. */
  ironingEquipment?: boolean;
  /** Dryer. An electrical machine designed to dry clothing. */
  dryer?: boolean;
  /** Toilet. A fixed bathroom feature connected to a sewer or septic system and consisting of a water-flushed bowl with a seat, as well as a device that elicites the water-flushing action. Used for the process and disposal of human waste. */
  toilet?: boolean;
  /** Universal power adapters exception. */
  universalPowerAdaptersException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Air conditioning. An electrical machine used to cool the temperature of the guestroom. */
  airConditioning?: boolean;
  /** Bathtub. A fixed plumbing feature set on the floor and consisting of a large container that accommodates the body of an adult for the purpose of seated bathing. Includes knobs or fixtures to control the temperature of the water, a faucet through which the water flows, and a drain that can be closed for filling and opened for draining. */
  bathtub?: boolean;
  /** Heating. An electrical machine used to warm the temperature of the guestroom. */
  heating?: boolean;
  /** Bathtub exception. */
  bathtubException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Hairdryer exception. */
  hairdryerException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bidet exception. */
  bidetException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Ironing equipment exception. */
  ironingEquipmentException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bidet. A plumbing fixture attached to a toilet or a low, fixed sink designed for the purpose of washing after toilet use. */
  bidet?: boolean;
  /** TV exception. */
  tvException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Pay per view movies exception. */
  payPerViewMoviesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** In-unit Wifi available. Guests can wirelessly connect to the Internet in the guestroom. Can be free or for a fee. */
  inunitWifiAvailable?: boolean;
  /** Shower. A fixed plumbing fixture for standing bathing that features a tall spray spout or faucet through which water flows, a knob or knobs that control the water's temperature, and a drain in the floor. */
  shower?: boolean;
  /** Air conditioning exception. */
  airConditioningException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** TV streaming. Televisions that embed a range of web-based apps to allow for watching media from those apps. */
  tvStreaming?: boolean;
  /** Universal power adapters. A power supply for electronic devices which plugs into a wall for the purpose of converting AC to a single DC voltage. Also know as AC adapter or charger. */
  universalPowerAdapters?: boolean;
  /** Pay per view movies. Televisions with channels that offer films that can be viewed for a fee, and have an interface to allow the viewer to accept the terms and approve payment. */
  payPerViewMovies?: boolean;
  /** Washer exception. */
  washerException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Washer. An electrical machine connected to a running water source designed to launder clothing. */
  washer?: boolean;
  /** Heating exception. */
  heatingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** In-unit Wifi available exception. */
  inunitWifiAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** In-unit safe exception. */
  inunitSafeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const LivingAreaFeatures: Schema.Schema<LivingAreaFeatures> = Schema.suspend(() => Schema.Struct({
  privateBathroom: Schema.optional(Schema.Boolean),
  tvCastingException: Schema.optional(Schema.String),
  showerException: Schema.optional(Schema.String),
  tvStreamingException: Schema.optional(Schema.String),
  dryerException: Schema.optional(Schema.String),
  fireplace: Schema.optional(Schema.Boolean),
  fireplaceException: Schema.optional(Schema.String),
  electronicRoomKeyException: Schema.optional(Schema.String),
  hairdryer: Schema.optional(Schema.Boolean),
  inunitSafe: Schema.optional(Schema.Boolean),
  tvCasting: Schema.optional(Schema.Boolean),
  electronicRoomKey: Schema.optional(Schema.Boolean),
  privateBathroomException: Schema.optional(Schema.String),
  tv: Schema.optional(Schema.Boolean),
  toiletException: Schema.optional(Schema.String),
  ironingEquipment: Schema.optional(Schema.Boolean),
  dryer: Schema.optional(Schema.Boolean),
  toilet: Schema.optional(Schema.Boolean),
  universalPowerAdaptersException: Schema.optional(Schema.String),
  airConditioning: Schema.optional(Schema.Boolean),
  bathtub: Schema.optional(Schema.Boolean),
  heating: Schema.optional(Schema.Boolean),
  bathtubException: Schema.optional(Schema.String),
  hairdryerException: Schema.optional(Schema.String),
  bidetException: Schema.optional(Schema.String),
  ironingEquipmentException: Schema.optional(Schema.String),
  bidet: Schema.optional(Schema.Boolean),
  tvException: Schema.optional(Schema.String),
  payPerViewMoviesException: Schema.optional(Schema.String),
  inunitWifiAvailable: Schema.optional(Schema.Boolean),
  shower: Schema.optional(Schema.Boolean),
  airConditioningException: Schema.optional(Schema.String),
  tvStreaming: Schema.optional(Schema.Boolean),
  universalPowerAdapters: Schema.optional(Schema.Boolean),
  payPerViewMovies: Schema.optional(Schema.Boolean),
  washerException: Schema.optional(Schema.String),
  washer: Schema.optional(Schema.Boolean),
  heatingException: Schema.optional(Schema.String),
  inunitWifiAvailableException: Schema.optional(Schema.String),
  inunitSafeException: Schema.optional(Schema.String),
})).annotate({ identifier: "LivingAreaFeatures" }) as any as Schema.Schema<LivingAreaFeatures>;

export interface MinimizedContact {
  /** Housekeeping scheduled request only exception. */
  housekeepingScheduledRequestOnlyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Digital guest room keys exception. */
  digitalGuestRoomKeysException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** High-touch items, such as decorative pillows, removed from guest rooms. */
  noHighTouchItemsGuestRooms?: boolean;
  /** Buffer maintained between room bookings. */
  roomBookingsBuffer?: boolean;
  /** No high touch items common areas exception. */
  noHighTouchItemsCommonAreasException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Plastic keycards disinfected exception. */
  plasticKeycardsDisinfectedException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Room bookings buffer exception. */
  roomBookingsBufferException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** No-contact check-in and check-out. */
  contactlessCheckinCheckout?: boolean;
  /** Contactless check-in check-out exception. */
  contactlessCheckinCheckoutException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Keyless mobile entry to guest rooms. */
  digitalGuestRoomKeys?: boolean;
  /** High-touch items, such as magazines, removed from common areas. */
  noHighTouchItemsCommonAreas?: boolean;
  /** Housekeeping scheduled by request only. */
  housekeepingScheduledRequestOnly?: boolean;
  /** Plastic key cards are disinfected or discarded. */
  plasticKeycardsDisinfected?: boolean;
  /** No high touch items guest rooms exception. */
  noHighTouchItemsGuestRoomsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const MinimizedContact: Schema.Schema<MinimizedContact> = Schema.suspend(() => Schema.Struct({
  housekeepingScheduledRequestOnlyException: Schema.optional(Schema.String),
  digitalGuestRoomKeysException: Schema.optional(Schema.String),
  noHighTouchItemsGuestRooms: Schema.optional(Schema.Boolean),
  roomBookingsBuffer: Schema.optional(Schema.Boolean),
  noHighTouchItemsCommonAreasException: Schema.optional(Schema.String),
  plasticKeycardsDisinfectedException: Schema.optional(Schema.String),
  roomBookingsBufferException: Schema.optional(Schema.String),
  contactlessCheckinCheckout: Schema.optional(Schema.Boolean),
  contactlessCheckinCheckoutException: Schema.optional(Schema.String),
  digitalGuestRoomKeys: Schema.optional(Schema.Boolean),
  noHighTouchItemsCommonAreas: Schema.optional(Schema.Boolean),
  housekeepingScheduledRequestOnly: Schema.optional(Schema.Boolean),
  plasticKeycardsDisinfected: Schema.optional(Schema.Boolean),
  noHighTouchItemsGuestRoomsException: Schema.optional(Schema.String),
})).annotate({ identifier: "MinimizedContact" }) as any as Schema.Schema<MinimizedContact>;

export interface Accessibility {
  /** Mobility accessible elevator exception. */
  mobilityAccessibleElevatorException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility accessible parking exception. */
  mobilityAccessibleParkingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility accessible pool. A swimming pool equipped with a mechanical chair that can be lowered and raised for the purpose of moving physically challenged guests into and out of the pool. May be powered by electricity or water. Also known as pool lift. */
  mobilityAccessiblePool?: boolean;
  /** Mobility accessible parking. The presence of a marked, designated area of prescribed size in which only registered, labeled vehicles transporting a person with physical challenges may park. */
  mobilityAccessibleParking?: boolean;
  /** Mobility accessible. Throughout the property there are physical adaptations to ease the stay of a person in a wheelchair, such as auto-opening doors, wide elevators, wide bathrooms or ramps. */
  mobilityAccessible?: boolean;
  /** Mobility accessible exception. */
  mobilityAccessibleException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility accessible elevator. A lift that transports people from one level to another and is built to accommodate a wheelchair-using passenger owing to the width of its doors and placement of call buttons. */
  mobilityAccessibleElevator?: boolean;
  /** Mobility accessible pool exception. */
  mobilityAccessiblePoolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Accessibility: Schema.Schema<Accessibility> = Schema.suspend(() => Schema.Struct({
  mobilityAccessibleElevatorException: Schema.optional(Schema.String),
  mobilityAccessibleParkingException: Schema.optional(Schema.String),
  mobilityAccessiblePool: Schema.optional(Schema.Boolean),
  mobilityAccessibleParking: Schema.optional(Schema.Boolean),
  mobilityAccessible: Schema.optional(Schema.Boolean),
  mobilityAccessibleException: Schema.optional(Schema.String),
  mobilityAccessibleElevator: Schema.optional(Schema.Boolean),
  mobilityAccessiblePoolException: Schema.optional(Schema.String),
})).annotate({ identifier: "Accessibility" }) as any as Schema.Schema<Accessibility>;

export interface ViewsFromUnit {
  /** Garden view exception. */
  gardenViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Landmark view. A guestroom that features a window through which guests can see a landmark such as the countryside, a golf course, the forest, a park, a rain forst, a mountain or a slope. */
  landmarkView?: boolean;
  /** Lake view. */
  lakeView?: boolean;
  /** Ocean view. A guestroom that features a window through which guests can see the ocean. */
  oceanView?: boolean;
  /** City view. A guestroom that features a window through which guests can see the buildings, parks and/or streets of the city. */
  cityView?: boolean;
  /** Landmark view exception. */
  landmarkViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** City view exception. */
  cityViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Valley view. A guestroom that features a window through which guests can see over a valley. */
  valleyView?: boolean;
  /** Lake view exception. */
  lakeViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Ocean view exception. */
  oceanViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Valley view exception. */
  valleyViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Beach view exception. */
  beachViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Pool view exception. */
  poolViewException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Beach view. A guestroom that features a window through which guests can see the beach. */
  beachView?: boolean;
  /** Garden view. A guestroom that features a window through which guests can see a garden. */
  gardenView?: boolean;
  /** Pool view. A guestroom that features a window through which guests can see the hotel's swimming pool. */
  poolView?: boolean;
}

export const ViewsFromUnit: Schema.Schema<ViewsFromUnit> = Schema.suspend(() => Schema.Struct({
  gardenViewException: Schema.optional(Schema.String),
  landmarkView: Schema.optional(Schema.Boolean),
  lakeView: Schema.optional(Schema.Boolean),
  oceanView: Schema.optional(Schema.Boolean),
  cityView: Schema.optional(Schema.Boolean),
  landmarkViewException: Schema.optional(Schema.String),
  cityViewException: Schema.optional(Schema.String),
  valleyView: Schema.optional(Schema.Boolean),
  lakeViewException: Schema.optional(Schema.String),
  oceanViewException: Schema.optional(Schema.String),
  valleyViewException: Schema.optional(Schema.String),
  beachViewException: Schema.optional(Schema.String),
  poolViewException: Schema.optional(Schema.String),
  beachView: Schema.optional(Schema.Boolean),
  gardenView: Schema.optional(Schema.Boolean),
  poolView: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ViewsFromUnit" }) as any as Schema.Schema<ViewsFromUnit>;

export interface LivingAreaAccessibility {
  /** Mobility-accessible unit exception. */
  mobilityAccessibleUnitException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility-accessible shower exception. */
  mobilityAccessibleShowerException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Hearing-accessible unit. A guestroom designed to accommodate the physical challenges of a guest with auditory issues. */
  hearingAccessibleUnit?: boolean;
  /** ADA compliant unit exception. */
  adaCompliantUnitException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility-accessible bathtub exception. */
  mobilityAccessibleBathtubException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Hearing-accessible fire alarm exception. */
  hearingAccessibleFireAlarmException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Hearing-accessible fire alarm. A device that gives warning of a fire through flashing lights. */
  hearingAccessibleFireAlarm?: boolean;
  /** Mobility-accessible toilet exception. */
  mobilityAccessibleToiletException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility-accessible unit. A guestroom designed to accommodate the physical challenges of a guest with mobility and/or auditory and/or visual issues. Usually features enlarged doorways, roll-in showers with seats, bathroom grab bars, and communication equipment for the hearing and sight challenged. */
  mobilityAccessibleUnit?: boolean;
  /** Mobility-accessible shower. A shower with an enlarged door or access point to accommodate a wheelchair or a waterproof seat for the physically challenged. */
  mobilityAccessibleShower?: boolean;
  /** Hearing-accessible doorbell. A visual indicator(s) of a knock or ring at the door. */
  hearingAccessibleDoorbell?: boolean;
  /** Hearing-accessible doorbell exception. */
  hearingAccessibleDoorbellException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Mobility-accessible toilet. A toilet with a higher seat, grab bars, and/or a larger area around it to accommodate the physically challenged. */
  mobilityAccessibleToilet?: boolean;
  /** Mobility-accessible bathtub. A bathtub that accomodates the physically challenged with additional railings or hand grips, a transfer seat or lift, and/or a door to enable walking into the tub. */
  mobilityAccessibleBathtub?: boolean;
  /** Hearing-accessible unit exception. */
  hearingAccessibleUnitException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** ADA compliant unit. A guestroom designed to accommodate the physical challenges of a guest with mobility and/or auditory and/or visual issues, as determined by legislative policy. Usually features enlarged doorways, roll-in showers with seats, bathroom grab bars, and communication equipment for the hearing and sight challenged. */
  adaCompliantUnit?: boolean;
}

export const LivingAreaAccessibility: Schema.Schema<LivingAreaAccessibility> = Schema.suspend(() => Schema.Struct({
  mobilityAccessibleUnitException: Schema.optional(Schema.String),
  mobilityAccessibleShowerException: Schema.optional(Schema.String),
  hearingAccessibleUnit: Schema.optional(Schema.Boolean),
  adaCompliantUnitException: Schema.optional(Schema.String),
  mobilityAccessibleBathtubException: Schema.optional(Schema.String),
  hearingAccessibleFireAlarmException: Schema.optional(Schema.String),
  hearingAccessibleFireAlarm: Schema.optional(Schema.Boolean),
  mobilityAccessibleToiletException: Schema.optional(Schema.String),
  mobilityAccessibleUnit: Schema.optional(Schema.Boolean),
  mobilityAccessibleShower: Schema.optional(Schema.Boolean),
  hearingAccessibleDoorbell: Schema.optional(Schema.Boolean),
  hearingAccessibleDoorbellException: Schema.optional(Schema.String),
  mobilityAccessibleToilet: Schema.optional(Schema.Boolean),
  mobilityAccessibleBathtub: Schema.optional(Schema.Boolean),
  hearingAccessibleUnitException: Schema.optional(Schema.String),
  adaCompliantUnit: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LivingAreaAccessibility" }) as any as Schema.Schema<LivingAreaAccessibility>;

export interface LivingAreaLayout {
  /** Loft exception. */
  loftException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Stairs. There are steps leading from one level or story to another in the unit. */
  stairs?: boolean;
  /** Balcony. An outdoor platform attached to a building and surrounded by a short wall, fence or other safety railing. The balcony is accessed through a door in a guestroom or suite and is for use by the guest staying in that room. May or may not include seating or outdoor furniture. Is not located on the ground floor. Also lanai. */
  balcony?: boolean;
  /** Patio. A paved, outdoor area with seating attached to and accessed through a ground-floor guestroom for use by the occupants of the guestroom. */
  patio?: boolean;
  /** Living area sq meters exception. */
  livingAreaSqMetersException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Stairs exception. */
  stairsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Loft. A three-walled upper area accessed by stairs or a ladder that overlooks the lower area of a room. */
  loft?: boolean;
  /** Living area sq meters. The measurement in meters of the area of a guestroom's living space. */
  livingAreaSqMeters?: number;
  /** Non smoking. A guestroom in which the smoking of cigarettes, cigars and pipes is prohibited. */
  nonSmoking?: boolean;
  /** Non smoking exception. */
  nonSmokingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Patio exception. */
  patioException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Balcony exception. */
  balconyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const LivingAreaLayout: Schema.Schema<LivingAreaLayout> = Schema.suspend(() => Schema.Struct({
  loftException: Schema.optional(Schema.String),
  stairs: Schema.optional(Schema.Boolean),
  balcony: Schema.optional(Schema.Boolean),
  patio: Schema.optional(Schema.Boolean),
  livingAreaSqMetersException: Schema.optional(Schema.String),
  stairsException: Schema.optional(Schema.String),
  loft: Schema.optional(Schema.Boolean),
  livingAreaSqMeters: Schema.optional(Schema.Number),
  nonSmoking: Schema.optional(Schema.Boolean),
  nonSmokingException: Schema.optional(Schema.String),
  patioException: Schema.optional(Schema.String),
  balconyException: Schema.optional(Schema.String),
})).annotate({ identifier: "LivingAreaLayout" }) as any as Schema.Schema<LivingAreaLayout>;

export interface LivingAreaEating {
  /** Coffee maker exception. */
  coffeeMakerException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Tea station. A small area with the supplies needed to heat water and make tea. */
  teaStation?: boolean;
  /** Oven. A temperature controlled, heated metal cabinet powered by gas or electricity in which food is placed for the purpose of cooking or reheating. */
  oven?: boolean;
  /** Kitchen available exception. */
  kitchenAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Dishwasher. A counter-height electrical cabinet containing racks for dirty dishware, cookware and cutlery, and a dispenser for soap built into the pull-down door. The cabinet is attached to the plumbing system to facilitate the automatic cleaning of its contents. */
  dishwasher?: boolean;
  /** Stove. A kitchen appliance powered by gas or electricity for the purpose of creating a flame or hot surface on which pots of food can be cooked. Also known as cooktop or hob. */
  stove?: boolean;
  /** Microwave. An electric oven that quickly cooks and heats food by microwave energy. Smaller than a standing or wall mounted oven. Usually placed on a kitchen counter, a shelf or tabletop or mounted above a cooktop. */
  microwave?: boolean;
  /** Kitchen available. An area of the guestroom designated for the preparation and storage of food via the presence of a refrigerator, cook top, oven and sink, as well as cutlery, dishes and cookware. Usually includes small appliances such a coffee maker and a microwave. May or may not include an automatic dishwasher. */
  kitchenAvailable?: boolean;
  /** Sink. A basin with a faucet attached to a water source and used for the purpose of washing and rinsing. */
  sink?: boolean;
  /** Snackbar exception. */
  snackbarException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Indoor grill exception. */
  indoorGrillException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Refrigerator exception. */
  refrigeratorException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Sink exception. */
  sinkException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Minibar exception. */
  minibarException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Outdoor grill. Metal grates on which food is cooked over an open flame or electric heat source. Part of an outdoor apparatus that supports the grates. Also known as barbecue grill or barbecue. */
  outdoorGrill?: boolean;
  /** Microwave exception. */
  microwaveException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Dishwasher exception. */
  dishwasherException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Snackbar. A small cabinet in the guestroom containing snacks. The items are most commonly available for a fee. */
  snackbar?: boolean;
  /** Cookware exception. */
  cookwareException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Toaster. A small, temperature controlled electric appliance with rectangular slots at the top that are lined with heated coils for the purpose of browning slices of bread products. */
  toaster?: boolean;
  /** Tea station exception. */
  teaStationException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Stove exception. */
  stoveException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Oven exception. */
  ovenException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Cookware. Kitchen pots, pans and utensils used in connection with the preparation of food. */
  cookware?: boolean;
  /** Minibar. A small refrigerated cabinet in the guestroom containing bottles/cans of soft drinks, mini bottles of alcohol, and snacks. The items are most commonly available for a fee. */
  minibar?: boolean;
  /** Coffee maker. An electric appliance that brews coffee by heating and forcing water through ground coffee. */
  coffeeMaker?: boolean;
  /** Kettle exception. */
  kettleException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Indoor grill. Metal grates built into an indoor cooktop on which food is cooked over an open flame or electric heat source. */
  indoorGrill?: boolean;
  /** Kettle. A covered container with a handle and a spout used for boiling water. */
  kettle?: boolean;
  /** Refrigerator. A large, climate-controlled electrical cabinet with vertical doors. Built for the purpose of chilling and storing perishable foods. */
  refrigerator?: boolean;
  /** Outdoor grill exception. */
  outdoorGrillException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Toaster exception. */
  toasterException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const LivingAreaEating: Schema.Schema<LivingAreaEating> = Schema.suspend(() => Schema.Struct({
  coffeeMakerException: Schema.optional(Schema.String),
  teaStation: Schema.optional(Schema.Boolean),
  oven: Schema.optional(Schema.Boolean),
  kitchenAvailableException: Schema.optional(Schema.String),
  dishwasher: Schema.optional(Schema.Boolean),
  stove: Schema.optional(Schema.Boolean),
  microwave: Schema.optional(Schema.Boolean),
  kitchenAvailable: Schema.optional(Schema.Boolean),
  sink: Schema.optional(Schema.Boolean),
  snackbarException: Schema.optional(Schema.String),
  indoorGrillException: Schema.optional(Schema.String),
  refrigeratorException: Schema.optional(Schema.String),
  sinkException: Schema.optional(Schema.String),
  minibarException: Schema.optional(Schema.String),
  outdoorGrill: Schema.optional(Schema.Boolean),
  microwaveException: Schema.optional(Schema.String),
  dishwasherException: Schema.optional(Schema.String),
  snackbar: Schema.optional(Schema.Boolean),
  cookwareException: Schema.optional(Schema.String),
  toaster: Schema.optional(Schema.Boolean),
  teaStationException: Schema.optional(Schema.String),
  stoveException: Schema.optional(Schema.String),
  ovenException: Schema.optional(Schema.String),
  cookware: Schema.optional(Schema.Boolean),
  minibar: Schema.optional(Schema.Boolean),
  coffeeMaker: Schema.optional(Schema.Boolean),
  kettleException: Schema.optional(Schema.String),
  indoorGrill: Schema.optional(Schema.Boolean),
  kettle: Schema.optional(Schema.Boolean),
  refrigerator: Schema.optional(Schema.Boolean),
  outdoorGrillException: Schema.optional(Schema.String),
  toasterException: Schema.optional(Schema.String),
})).annotate({ identifier: "LivingAreaEating" }) as any as Schema.Schema<LivingAreaEating>;

export interface LivingArea {
  /** Accessibility features of the living area. */
  accessibility?: LivingAreaAccessibility;
  /** Information about the layout of the living area. */
  layout?: LivingAreaLayout;
  /** Information about eating features in the living area. */
  eating?: LivingAreaEating;
  /** Information about sleeping features in the living area. */
  sleeping?: LivingAreaSleeping;
  /** Features in the living area. */
  features?: LivingAreaFeatures;
}

export const LivingArea: Schema.Schema<LivingArea> = Schema.suspend(() => Schema.Struct({
  accessibility: Schema.optional(LivingAreaAccessibility),
  layout: Schema.optional(LivingAreaLayout),
  eating: Schema.optional(LivingAreaEating),
  sleeping: Schema.optional(LivingAreaSleeping),
  features: Schema.optional(LivingAreaFeatures),
})).annotate({ identifier: "LivingArea" }) as any as Schema.Schema<LivingArea>;

export interface GuestUnitFeatures {
  /** Executive floor. A floor of the hotel where the guestrooms are only bookable by members of the hotel's frequent guest membership program. Benefits of this room class include access to a designated lounge which may or may not feature free breakfast, cocktails or other perks specific to members of the program. */
  executiveFloor?: boolean;
  /** Max occupants count. The total number of guests allowed to stay overnight in the guestroom. */
  maxOccupantsCount?: number;
  /** Suite. A guestroom category that implies both a bedroom area and a separate living area. There may or may not be full walls and doors separating the two areas, but regardless, they are very distinct. Does not mean a couch or chair in a bedroom. */
  suite?: boolean;
  /** Max adult occupants count exception. */
  maxAdultOccupantsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Tier exception. */
  tierException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Suite exception. */
  suiteException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Views available from the guest unit itself. */
  views?: ViewsFromUnit;
  /** Features available in the living areas in the guest unit. */
  totalLivingAreas?: LivingArea;
  /** Max child occupants count. The total number of children allowed to stay overnight in the room. */
  maxChildOccupantsCount?: number;
  /** Max child occupants count exception. */
  maxChildOccupantsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Private home. A privately owned home (house, townhouse, apartment, cabin, bungalow etc) that may or not serve as the owner's residence, but is rented out in its entirety or by the room(s) to paying guest(s) for vacation stays. Not for lease-based, long-term residency. */
  privateHome?: boolean;
  /** Connecting unit available. A guestroom type that features access to an adjacent guestroom for the purpose of booking both rooms. Most often used by families who need more than one room to accommodate the number of people in their group. */
  connectingUnitAvailable?: boolean;
  /** Private home exception. */
  privateHomeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bungalow or villa exception. */
  bungalowOrVillaException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Max adult occupants count. The total number of adult guests allowed to stay overnight in the guestroom. */
  maxAdultOccupantsCount?: number;
  /** Tier. Classification of the unit based on available features/amenities. A non-standard tier is only permitted if at least one other unit type falls under the standard tier. */
  tier?: "UNIT_TIER_UNSPECIFIED" | "STANDARD_UNIT" | "DELUXE_UNIT" | (string & {});
  /** Max occupants count exception. */
  maxOccupantsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Bungalow or villa. An independent structure that is part of a hotel or resort that is rented to one party for a vacation stay. The hotel or resort may be completely comprised of bungalows or villas, or they may be one of several guestroom options. Guests in the bungalows or villas most often have the same, if not more, amenities and services offered to guests in other guestroom types. */
  bungalowOrVilla?: boolean;
  /** Connecting unit available exception. */
  connectingUnitAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Executive floor exception. */
  executiveFloorException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const GuestUnitFeatures: Schema.Schema<GuestUnitFeatures> = Schema.suspend(() => Schema.Struct({
  executiveFloor: Schema.optional(Schema.Boolean),
  maxOccupantsCount: Schema.optional(Schema.Number),
  suite: Schema.optional(Schema.Boolean),
  maxAdultOccupantsCountException: Schema.optional(Schema.String),
  tierException: Schema.optional(Schema.String),
  suiteException: Schema.optional(Schema.String),
  views: Schema.optional(ViewsFromUnit),
  totalLivingAreas: Schema.optional(LivingArea),
  maxChildOccupantsCount: Schema.optional(Schema.Number),
  maxChildOccupantsCountException: Schema.optional(Schema.String),
  privateHome: Schema.optional(Schema.Boolean),
  connectingUnitAvailable: Schema.optional(Schema.Boolean),
  privateHomeException: Schema.optional(Schema.String),
  bungalowOrVillaException: Schema.optional(Schema.String),
  maxAdultOccupantsCount: Schema.optional(Schema.Number),
  tier: Schema.optional(Schema.String),
  maxOccupantsCountException: Schema.optional(Schema.String),
  bungalowOrVilla: Schema.optional(Schema.Boolean),
  connectingUnitAvailableException: Schema.optional(Schema.String),
  executiveFloorException: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestUnitFeatures" }) as any as Schema.Schema<GuestUnitFeatures>;

export interface Housekeeping {
  /** Daily housekeeping exception. */
  dailyHousekeepingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Housekeeping available. Guest units are cleaned by hotel staff during guest's stay. Schedule may vary from daily, weekly, or specific days of the week. */
  housekeepingAvailable?: boolean;
  /** Housekeeping available exception. */
  housekeepingAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Turndown service exception. */
  turndownServiceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Turndown service. Hotel staff enters guest units to prepare the bed for sleep use. May or may not include some light housekeeping. May or may not include an evening snack or candy. Also known as evening service. */
  turndownService?: boolean;
  /** Daily housekeeping. Guest units are cleaned by hotel staff daily during guest's stay. */
  dailyHousekeeping?: boolean;
}

export const Housekeeping: Schema.Schema<Housekeeping> = Schema.suspend(() => Schema.Struct({
  dailyHousekeepingException: Schema.optional(Schema.String),
  housekeepingAvailable: Schema.optional(Schema.Boolean),
  housekeepingAvailableException: Schema.optional(Schema.String),
  turndownServiceException: Schema.optional(Schema.String),
  turndownService: Schema.optional(Schema.Boolean),
  dailyHousekeeping: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Housekeeping" }) as any as Schema.Schema<Housekeeping>;

export interface LanguageSpoken {
  /** Required. The BCP-47 language code for the spoken language. Currently accepted codes: ar, de, en, es, fil, fr, hi, id, it, ja, ko, nl, pt, ru, vi, yue, zh. */
  languageCode?: string;
  /** At least one member of the staff can speak the language. */
  spoken?: boolean;
  /** Spoken exception. */
  spokenException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const LanguageSpoken: Schema.Schema<LanguageSpoken> = Schema.suspend(() => Schema.Struct({
  languageCode: Schema.optional(Schema.String),
  spoken: Schema.optional(Schema.Boolean),
  spokenException: Schema.optional(Schema.String),
})).annotate({ identifier: "LanguageSpoken" }) as any as Schema.Schema<LanguageSpoken>;

export interface Services {
  /** Baggage storage. A provision for guests to leave their bags at the hotel when they arrive for their stay before the official check-in time. May or may not apply for guests who wish to leave their bags after check-out and before departing the locale. Also known as bag dropoff. */
  baggageStorage?: boolean;
  /** Gift shop exception. */
  giftShopException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Concierge. Hotel staff member(s) responsible for facilitating an easy, comfortable stay through making reservations for meals, sourcing theater tickets, arranging tours, finding a doctor, making recommendations, and answering questions. */
  concierge?: boolean;
  /** Self service laundry. On-site clothes washers and dryers accessible to guests for the purpose of washing and drying their own clothes. May or may not require payment to use the machines. */
  selfServiceLaundry?: boolean;
  /** 24hr front desk exception. */
  twentyFourHourFrontDeskException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Self service laundry exception. */
  selfServiceLaundryException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Currency exchange. A staff member or automated machine tasked with the transaction of providing the native currency of the hotel's locale in exchange for the foreign currency provided by a guest. */
  currencyExchange?: boolean;
  /** Gift shop. An on-site store primarily selling souvenirs, mementos and other gift items. May or may not also sell sundries, magazines and newspapers, clothing, or snacks. */
  giftShop?: boolean;
  /** Elevator. A passenger elevator that transports guests from one story to another. Also known as lift. */
  elevator?: boolean;
  /** Convenience store. A shop at the hotel primarily selling snacks, drinks, non-prescription medicines, health and beauty aids, magazines and newspapers. */
  convenienceStore?: boolean;
  /** Wake up calls exception. */
  wakeUpCallsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Languages spoken by at least one staff member. */
  languagesSpoken?: Array<LanguageSpoken>;
  /** Convenience store exception. */
  convenienceStoreException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** 24hr front desk. Front desk is staffed 24 hours a day. */
  twentyFourHourFrontDesk?: boolean;
  /** Concierge exception. */
  conciergeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Elevator exception. */
  elevatorException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Front desk. A counter or desk in the lobby or the immediate interior of the hotel where a member of the staff greets guests and processes the information related to their stay (including check-in and check-out). May or may not be manned and open 24/7. */
  frontDesk?: boolean;
  /** Full service laundry. Laundry and dry cleaning facilitated and handled by the hotel on behalf of the guest. Does not include the provision for guests to do their own laundry in on-site machines. */
  fullServiceLaundry?: boolean;
  /** Full service laundry exception. */
  fullServiceLaundryException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Social hour exception. */
  socialHourException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Front desk exception. */
  frontDeskException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Social hour. A reception with complimentary soft drinks, tea, coffee, wine and/or cocktails in the afternoon or evening. Can be hosted by hotel staff or guests may serve themselves. Also known as wine hour. The availability of coffee/tea in the lobby throughout the day does not constitute a social or wine hour. */
  socialHour?: boolean;
  /** Currency exchange exception. */
  currencyExchangeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Wake up calls. By direction of the guest, a hotel staff member will phone the guest unit at the requested hour. Also known as morning call. */
  wakeUpCalls?: boolean;
  /** Baggage storage exception. */
  baggageStorageException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Services: Schema.Schema<Services> = Schema.suspend(() => Schema.Struct({
  baggageStorage: Schema.optional(Schema.Boolean),
  giftShopException: Schema.optional(Schema.String),
  concierge: Schema.optional(Schema.Boolean),
  selfServiceLaundry: Schema.optional(Schema.Boolean),
  twentyFourHourFrontDeskException: Schema.optional(Schema.String),
  selfServiceLaundryException: Schema.optional(Schema.String),
  currencyExchange: Schema.optional(Schema.Boolean),
  giftShop: Schema.optional(Schema.Boolean),
  elevator: Schema.optional(Schema.Boolean),
  convenienceStore: Schema.optional(Schema.Boolean),
  wakeUpCallsException: Schema.optional(Schema.String),
  languagesSpoken: Schema.optional(Schema.Array(LanguageSpoken)),
  convenienceStoreException: Schema.optional(Schema.String),
  twentyFourHourFrontDesk: Schema.optional(Schema.Boolean),
  conciergeException: Schema.optional(Schema.String),
  elevatorException: Schema.optional(Schema.String),
  frontDesk: Schema.optional(Schema.Boolean),
  fullServiceLaundry: Schema.optional(Schema.Boolean),
  fullServiceLaundryException: Schema.optional(Schema.String),
  socialHourException: Schema.optional(Schema.String),
  frontDeskException: Schema.optional(Schema.String),
  socialHour: Schema.optional(Schema.Boolean),
  currencyExchangeException: Schema.optional(Schema.String),
  wakeUpCalls: Schema.optional(Schema.Boolean),
  baggageStorageException: Schema.optional(Schema.String),
})).annotate({ identifier: "Services" }) as any as Schema.Schema<Services>;

export interface Property {
  /** Last renovated year exception. */
  lastRenovatedYearException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Built year. The year that construction of the property was completed. */
  builtYear?: number;
  /** Rooms count. The total number of rooms and suites bookable by guests for an overnight stay. Does not include event space, public spaces, conference rooms, fitness rooms, business centers, spa, salon, restaurants/bars, or shops. */
  roomsCount?: number;
  /** Rooms count exception. */
  roomsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Built year exception. */
  builtYearException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Floors count exception. */
  floorsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Last renovated year. The year when the most recent renovation of the property was completed. Renovation may include all or any combination of the following: the units, the public spaces, the exterior, or the interior. */
  lastRenovatedYear?: number;
  /** Floors count. The number of stories the building has from the ground floor to the top floor that are accessible to guests. */
  floorsCount?: number;
}

export const Property: Schema.Schema<Property> = Schema.suspend(() => Schema.Struct({
  lastRenovatedYearException: Schema.optional(Schema.String),
  builtYear: Schema.optional(Schema.Number),
  roomsCount: Schema.optional(Schema.Number),
  roomsCountException: Schema.optional(Schema.String),
  builtYearException: Schema.optional(Schema.String),
  floorsCountException: Schema.optional(Schema.String),
  lastRenovatedYear: Schema.optional(Schema.Number),
  floorsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Property" }) as any as Schema.Schema<Property>;

export interface Parking {
  /** Free parking exception. */
  freeParkingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Self parking available exception. */
  selfParkingAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Parking available. The hotel allows the cars of guests to be parked. Can be free or for a fee. Parking facility may be an outdoor lot or an indoor garage, but must be onsite. Nearby parking does not apply. Parking may be performed by the guest or by hotel staff. */
  parkingAvailable?: boolean;
  /** Parking available exception. */
  parkingAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free self parking exception. */
  freeSelfParkingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Electric car charging stations. Electric power stations, usually located outdoors, into which guests plug their electric cars to receive a charge. */
  electricCarChargingStations?: boolean;
  /** Valet parking available exception. */
  valetParkingAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Self parking available. Guests park their own cars. Parking facility may be an outdoor lot or an indoor garage, but must be onsite. Nearby parking does not apply. Can be free or for a fee. */
  selfParkingAvailable?: boolean;
  /** Valet parking available. Hotel staff member parks the cars of guests. Parking with this service can be free or for a fee. */
  valetParkingAvailable?: boolean;
  /** Free parking. The hotel allows the cars of guests to be parked for free. Parking facility may be an outdoor lot or an indoor garage, but must be onsite. Nearby parking does not apply. Parking may be performed by the guest or by hotel staff. Free parking must be available to all guests (limited conditions does not apply). */
  freeParking?: boolean;
  /** Electric car charging stations exception. */
  electricCarChargingStationsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free valet parking exception. */
  freeValetParkingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free valet parking. Hotel staff member parks the cars of guests. Parking with this service is free. */
  freeValetParking?: boolean;
  /** Free self parking. Guests park their own cars for free. Parking facility may be an outdoor lot or an indoor garage, but must be onsite. Nearby parking does not apply. */
  freeSelfParking?: boolean;
}

export const Parking: Schema.Schema<Parking> = Schema.suspend(() => Schema.Struct({
  freeParkingException: Schema.optional(Schema.String),
  selfParkingAvailableException: Schema.optional(Schema.String),
  parkingAvailable: Schema.optional(Schema.Boolean),
  parkingAvailableException: Schema.optional(Schema.String),
  freeSelfParkingException: Schema.optional(Schema.String),
  electricCarChargingStations: Schema.optional(Schema.Boolean),
  valetParkingAvailableException: Schema.optional(Schema.String),
  selfParkingAvailable: Schema.optional(Schema.Boolean),
  valetParkingAvailable: Schema.optional(Schema.Boolean),
  freeParking: Schema.optional(Schema.Boolean),
  electricCarChargingStationsException: Schema.optional(Schema.String),
  freeValetParkingException: Schema.optional(Schema.String),
  freeValetParking: Schema.optional(Schema.Boolean),
  freeSelfParking: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Parking" }) as any as Schema.Schema<Parking>;

export interface PaymentOptions {
  /** Cheque. The hotel accepts a printed document issued by the guest's bank in the guest's name as a form of payment. */
  cheque?: boolean;
  /** Cash. The hotel accepts payment by paper/coin currency. */
  cash?: boolean;
  /** Mobile nfc exception. */
  mobileNfcException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Debit card. The hotel accepts a bank-issued card that immediately deducts the charged funds from the guest's bank account upon processing. */
  debitCard?: boolean;
  /** Mobile nfc. The hotel has the compatible computer hardware terminal that reads and charges a payment app on the guest's smartphone without requiring the two devices to make physical contact. Also known as Apple Pay, Google Pay, Samsung Pay. */
  mobileNfc?: boolean;
  /** Credit card exception. */
  creditCardException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Credit card. The hotel accepts payment by a card issued by a bank or credit card company. Also known as charge card, debit card, bank card, or charge plate. */
  creditCard?: boolean;
  /** Cash exception. */
  cashException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Cheque exception. */
  chequeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Debit card exception. */
  debitCardException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const PaymentOptions: Schema.Schema<PaymentOptions> = Schema.suspend(() => Schema.Struct({
  cheque: Schema.optional(Schema.Boolean),
  cash: Schema.optional(Schema.Boolean),
  mobileNfcException: Schema.optional(Schema.String),
  debitCard: Schema.optional(Schema.Boolean),
  mobileNfc: Schema.optional(Schema.Boolean),
  creditCardException: Schema.optional(Schema.String),
  creditCard: Schema.optional(Schema.Boolean),
  cashException: Schema.optional(Schema.String),
  chequeException: Schema.optional(Schema.String),
  debitCardException: Schema.optional(Schema.String),
})).annotate({ identifier: "PaymentOptions" }) as any as Schema.Schema<PaymentOptions>;

export interface TimeOfDay {
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  nanos: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface Policies {
  /** Max child age. The hotel allows children up to a certain age to stay in the room/suite of a parent or adult without an additional fee. */
  maxChildAge?: number;
  /** Forms of payment accepted at the property. */
  paymentOptions?: PaymentOptions;
  /** Smoke free property. Smoking is not allowed inside the building, on balconies, or in outside spaces. Hotels that offer a designated area for guests to smoke are not considered smoke-free properties. */
  smokeFreeProperty?: boolean;
  /** Check-out time exception. */
  checkoutTimeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Max kids stay free count exception. */
  maxKidsStayFreeCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** All inclusive only. The only rate option offered by the hotel is a rate that includes the cost of the room, meals, activities and other amenities that might otherwise be charged separately. */
  allInclusiveOnly?: boolean;
  /** Check-in time exception. */
  checkinTimeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** All inclusive only exception. */
  allInclusiveOnlyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** All inclusive available exception. */
  allInclusiveAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Max kids stay free count. The hotel allows a specific, defined number of children to stay in the room/suite of a parent or adult without an additional fee. */
  maxKidsStayFreeCount?: number;
  /** Check-in time. The time of the day at which the hotel begins providing guests access to their unit at the beginning of their stay. */
  checkinTime?: TimeOfDay;
  /** Check-out time. The time of the day on the last day of a guest's reserved stay at which the guest must vacate their room and settle their bill. Some hotels may offer late or early check out for a fee. */
  checkoutTime?: TimeOfDay;
  /** Smoke free property exception. */
  smokeFreePropertyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** All inclusive available. The hotel offers a rate option that includes the cost of the room, meals, activities, and other amenities that might otherwise be charged separately. */
  allInclusiveAvailable?: boolean;
  /** Max child age exception. */
  maxChildAgeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Kids stay free exception. */
  kidsStayFreeException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Kids stay free. The children of guests are allowed to stay in the room/suite of a parent or adult without an additional fee. The policy may or may not stipulate a limit of the child's age or the overall number of children allowed. */
  kidsStayFree?: boolean;
}

export const Policies: Schema.Schema<Policies> = Schema.suspend(() => Schema.Struct({
  maxChildAge: Schema.optional(Schema.Number),
  paymentOptions: Schema.optional(PaymentOptions),
  smokeFreeProperty: Schema.optional(Schema.Boolean),
  checkoutTimeException: Schema.optional(Schema.String),
  maxKidsStayFreeCountException: Schema.optional(Schema.String),
  allInclusiveOnly: Schema.optional(Schema.Boolean),
  checkinTimeException: Schema.optional(Schema.String),
  allInclusiveOnlyException: Schema.optional(Schema.String),
  allInclusiveAvailableException: Schema.optional(Schema.String),
  maxKidsStayFreeCount: Schema.optional(Schema.Number),
  checkinTime: Schema.optional(TimeOfDay),
  checkoutTime: Schema.optional(TimeOfDay),
  smokeFreePropertyException: Schema.optional(Schema.String),
  allInclusiveAvailable: Schema.optional(Schema.Boolean),
  maxChildAgeException: Schema.optional(Schema.String),
  kidsStayFreeException: Schema.optional(Schema.String),
  kidsStayFree: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Policies" }) as any as Schema.Schema<Policies>;

export interface Wellness {
  /** Fitness center exception. */
  fitnessCenterException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Massage. A service provided by a trained massage therapist involving the physical manipulation of a guest's muscles in order to achieve relaxation or pain relief. */
  massage?: boolean;
  /** Fitness center. A room or building at the hotel containing equipment to promote physical activity, such as treadmills, elliptical machines, stationary bikes, weight machines, free weights, and/or stretching mats. Use of the fitness center can be free or for a fee. May or may not be staffed. May or may not offer instructor-led classes in various styles of physical conditioning. May or may not be open 24/7. May or may not include locker rooms and showers. Also known as health club, gym, fitness room, health center. */
  fitnessCenter?: boolean;
  /** Elliptical machine. An electric, stationary fitness machine with pedals that simulates climbing, walking or running and provides a user-controlled range of speeds and tensions. May not have arm-controlled levers to work out the upper body as well. Commonly found in a gym, fitness room, health center, or health club. */
  ellipticalMachine?: boolean;
  /** Sauna. A wood-paneled room heated to a high temperature where guests sit on built-in wood benches for the purpose of perspiring and relaxing their muscles. Can be dry or slightly wet heat. Not a steam room. */
  sauna?: boolean;
  /** Free weights exception. */
  freeWeightsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Spa. A designated area, room or building at the hotel offering health and beauty treatment through such means as steam baths, exercise equipment, and massage. May also offer facials, nail care, and hair care. Services are usually available by appointment and for an additional fee. Does not apply if hotel only offers a steam room; must offer other beauty and/or health treatments as well. */
  spa?: boolean;
  /** Elliptical machine exception. */
  ellipticalMachineException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Doctor on call. The hotel has a contract with a medical professional who provides services to hotel guests should they fall ill during their stay. The doctor may or may not have an on-site office or be at the hotel at all times. */
  doctorOnCall?: boolean;
  /** Spa exception. */
  spaException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free fitness center. Guests may use the fitness center for free. */
  freeFitnessCenter?: boolean;
  /** Massage exception. */
  massageException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Doctor on call exception. */
  doctorOnCallException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Weight machine exception. */
  weightMachineException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free weights. Individual handheld fitness equipment of varied weights used for upper body strength training or bodybuilding. Also known as barbells, dumbbells, or kettlebells. Often stored on a rack with the weights arranged from light to heavy. Commonly found in a gym, fitness room, health center, or health club. */
  freeWeights?: boolean;
  /** Salon. A room at the hotel where professionals provide hair styling services such as shampooing, blow drying, hair dos, hair cutting and hair coloring. Also known as hairdresser or beauty salon. */
  salon?: boolean;
  /** Treadmill. An electric stationary fitness machine that simulates a moving path to promote walking or running within a range of user-controlled speeds and inclines. Also known as running machine. Commonly found in a gym, fitness room, health center, or health club. */
  treadmill?: boolean;
  /** Free fitness center exception. */
  freeFitnessCenterException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Weight machine. Non-electronic fitness equipment designed for the user to target the exertion of different muscles. Usually incorporates a padded seat, a stack of flat weights and various bars and pulleys. May be designed for toning a specific part of the body or may involve different user-controlled settings, hardware and pulleys so as to provide an overall workout in one machine. Commonly found in a gym, fitness center, fitness room, or health club. */
  weightMachine?: boolean;
  /** Salon exception. */
  salonException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Sauna exception. */
  saunaException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Treadmill exception. */
  treadmillException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Wellness: Schema.Schema<Wellness> = Schema.suspend(() => Schema.Struct({
  fitnessCenterException: Schema.optional(Schema.String),
  massage: Schema.optional(Schema.Boolean),
  fitnessCenter: Schema.optional(Schema.Boolean),
  ellipticalMachine: Schema.optional(Schema.Boolean),
  sauna: Schema.optional(Schema.Boolean),
  freeWeightsException: Schema.optional(Schema.String),
  spa: Schema.optional(Schema.Boolean),
  ellipticalMachineException: Schema.optional(Schema.String),
  doctorOnCall: Schema.optional(Schema.Boolean),
  spaException: Schema.optional(Schema.String),
  freeFitnessCenter: Schema.optional(Schema.Boolean),
  massageException: Schema.optional(Schema.String),
  doctorOnCallException: Schema.optional(Schema.String),
  weightMachineException: Schema.optional(Schema.String),
  freeWeights: Schema.optional(Schema.Boolean),
  salon: Schema.optional(Schema.Boolean),
  treadmill: Schema.optional(Schema.Boolean),
  freeFitnessCenterException: Schema.optional(Schema.String),
  weightMachine: Schema.optional(Schema.Boolean),
  salonException: Schema.optional(Schema.String),
  saunaException: Schema.optional(Schema.String),
  treadmillException: Schema.optional(Schema.String),
})).annotate({ identifier: "Wellness" }) as any as Schema.Schema<Wellness>;

export interface FoodAndDrink {
  /** Dinner buffet exception. */
  dinnerBuffetException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** 24hr room service exception. */
  twentyFourHourRoomServiceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Restaurants count. The number of restaurants at the hotel. */
  restaurantsCount?: number;
  /** Vending machine exception. */
  vendingMachineException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Breakfast available. The morning meal is offered to all guests. Can be free or for a fee. */
  breakfastAvailable?: boolean;
  /** Room service. A hotel staffer delivers meals prepared onsite to a guest's room as per their request. May or may not be available during specific hours. Services should be available to all guests (not based on rate/room booked/reward program, etc). */
  roomService?: boolean;
  /** Free breakfast. Breakfast is offered for free to all guests. Does not apply if limited to certain room packages. */
  freeBreakfast?: boolean;
  /** Restaurant exception. */
  restaurantException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Table service. A restaurant in which a staff member is assigned to a guest's table to take their order, deliver and clear away food, and deliver the bill, if applicable. Also known as sit-down restaurant. */
  tableService?: boolean;
  /** Restaurant. A business onsite at the hotel that is open to the public as well as guests, and offers meals and beverages to consume at tables or counters. May or may not include table service. Also known as cafe, buffet, eatery. A "breakfast room" where the hotel serves breakfast only to guests (not the general public) does not count as a restaurant. */
  restaurant?: boolean;
  /** Room service exception. */
  roomServiceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** 24hr room service. Room service is available 24 hours a day. */
  twentyFourHourRoomService?: boolean;
  /** Free breakfast exception. */
  freeBreakfastException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Breakfast buffet. Breakfast meal service where guests serve themselves from a variety of dishes/foods that are put out on a table. */
  breakfastBuffet?: boolean;
  /** Buffet. A type of meal where guests serve themselves from a variety of dishes/foods that are put out on a table. Includes lunch and/or dinner meals. A breakfast-only buffet is not sufficient. */
  buffet?: boolean;
  /** Bar. A designated room, lounge or area of an on-site restaurant with seating at a counter behind which a hotel staffer takes the guest's order and provides the requested alcoholic drink. Can be indoors or outdoors. Also known as Pub. */
  bar?: boolean;
  /** Bar exception. */
  barException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Breakfast available exception. */
  breakfastAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Buffet exception. */
  buffetException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Vending machine. A glass-fronted mechanized cabinet displaying and dispensing snacks and beverages for purchase by coins, paper money and/or credit cards. */
  vendingMachine?: boolean;
  /** Dinner buffet. Dinner meal service where guests serve themselves from a variety of dishes/foods that are put out on a table. */
  dinnerBuffet?: boolean;
  /** Restaurants count exception. */
  restaurantsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Table service exception. */
  tableServiceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Breakfast buffet exception. */
  breakfastBuffetException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const FoodAndDrink: Schema.Schema<FoodAndDrink> = Schema.suspend(() => Schema.Struct({
  dinnerBuffetException: Schema.optional(Schema.String),
  twentyFourHourRoomServiceException: Schema.optional(Schema.String),
  restaurantsCount: Schema.optional(Schema.Number),
  vendingMachineException: Schema.optional(Schema.String),
  breakfastAvailable: Schema.optional(Schema.Boolean),
  roomService: Schema.optional(Schema.Boolean),
  freeBreakfast: Schema.optional(Schema.Boolean),
  restaurantException: Schema.optional(Schema.String),
  tableService: Schema.optional(Schema.Boolean),
  restaurant: Schema.optional(Schema.Boolean),
  roomServiceException: Schema.optional(Schema.String),
  twentyFourHourRoomService: Schema.optional(Schema.Boolean),
  freeBreakfastException: Schema.optional(Schema.String),
  breakfastBuffet: Schema.optional(Schema.Boolean),
  buffet: Schema.optional(Schema.Boolean),
  bar: Schema.optional(Schema.Boolean),
  barException: Schema.optional(Schema.String),
  breakfastAvailableException: Schema.optional(Schema.String),
  buffetException: Schema.optional(Schema.String),
  vendingMachine: Schema.optional(Schema.Boolean),
  dinnerBuffet: Schema.optional(Schema.Boolean),
  restaurantsCountException: Schema.optional(Schema.String),
  tableServiceException: Schema.optional(Schema.String),
  breakfastBuffetException: Schema.optional(Schema.String),
})).annotate({ identifier: "FoodAndDrink" }) as any as Schema.Schema<FoodAndDrink>;

export interface Families {
  /** Kids activities exception. */
  kidsActivitiesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Kids club exception. */
  kidsClubException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Babysitting exception. */
  babysittingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Kids activities. Recreational options such as sports, films, crafts and games designed for the enjoyment of children and offered at the hotel. May or may not be supervised. May or may not be at a designated time or place. Cab be free or for a fee. */
  kidsActivities?: boolean;
  /** Kids club. An organized program of group activities held at the hotel and designed for the enjoyment of children. Facilitated by hotel staff (or staff procured by the hotel) in an area(s) designated for the purpose of entertaining children without their parents. May include games, outings, water sports, team sports, arts and crafts, and films. Usually has set hours. Can be free or for a fee. Also known as Kids Camp or Kids program. */
  kidsClub?: boolean;
  /** Babysitting. Child care that is offered by hotel staffers or coordinated by hotel staffers with local child care professionals. Can be free or for a fee. */
  babysitting?: boolean;
  /** Kids friendly. The hotel has one or more special features for families with children, such as reduced rates, child-sized beds, kids' club, babysitting service, or suitable place to play on premises. */
  kidsFriendly?: boolean;
  /** Kids friendly exception. */
  kidsFriendlyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Families: Schema.Schema<Families> = Schema.suspend(() => Schema.Struct({
  kidsActivitiesException: Schema.optional(Schema.String),
  kidsClubException: Schema.optional(Schema.String),
  babysittingException: Schema.optional(Schema.String),
  kidsActivities: Schema.optional(Schema.Boolean),
  kidsClub: Schema.optional(Schema.Boolean),
  babysitting: Schema.optional(Schema.Boolean),
  kidsFriendly: Schema.optional(Schema.Boolean),
  kidsFriendlyException: Schema.optional(Schema.String),
})).annotate({ identifier: "Families" }) as any as Schema.Schema<Families>;

export interface Business {
  /** Meeting rooms. Rooms at the hotel designated for business-related gatherings. Rooms are usually equipped with tables or desks, office chairs and audio/visual facilities to allow for presentations and conference calls. Also known as conference rooms. */
  meetingRooms?: boolean;
  /** Meeting rooms count. The number of meeting rooms at the property. */
  meetingRoomsCount?: number;
  /** Business center. A designated room at the hotel with one or more desks and equipped with guest-use computers, printers, fax machines and/or photocopiers. May or may not be open 24/7. May or may not require a key to access. Not a meeting room or conference room. */
  businessCenter?: boolean;
  /** Meeting rooms exception. */
  meetingRoomsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Business center exception. */
  businessCenterException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Meeting rooms count exception. */
  meetingRoomsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Business: Schema.Schema<Business> = Schema.suspend(() => Schema.Struct({
  meetingRooms: Schema.optional(Schema.Boolean),
  meetingRoomsCount: Schema.optional(Schema.Number),
  businessCenter: Schema.optional(Schema.Boolean),
  meetingRoomsException: Schema.optional(Schema.String),
  businessCenterException: Schema.optional(Schema.String),
  meetingRoomsCountException: Schema.optional(Schema.String),
})).annotate({ identifier: "Business" }) as any as Schema.Schema<Business>;

export interface PhysicalDistancing {
  /** Wellness areas have private spaces exception. */
  wellnessAreasHavePrivateSpacesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Physical distancing required. */
  physicalDistancingRequired?: boolean;
  /** Guest occupancy limited within shared facilities. */
  sharedAreasLimitedOccupancy?: boolean;
  /** Physical distancing required exception. */
  physicalDistancingRequiredException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Private spaces designated in spa and wellness areas. */
  wellnessAreasHavePrivateSpaces?: boolean;
  /** Safety dividers exception. */
  safetyDividersException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Shared areas limited occupancy exception. */
  sharedAreasLimitedOccupancyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Common areas arranged to maintain physical distancing. */
  commonAreasPhysicalDistancingArranged?: boolean;
  /** Safety dividers at front desk and other locations. */
  safetyDividers?: boolean;
  /** Common areas physical distancing arranged exception. */
  commonAreasPhysicalDistancingArrangedException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const PhysicalDistancing: Schema.Schema<PhysicalDistancing> = Schema.suspend(() => Schema.Struct({
  wellnessAreasHavePrivateSpacesException: Schema.optional(Schema.String),
  physicalDistancingRequired: Schema.optional(Schema.Boolean),
  sharedAreasLimitedOccupancy: Schema.optional(Schema.Boolean),
  physicalDistancingRequiredException: Schema.optional(Schema.String),
  wellnessAreasHavePrivateSpaces: Schema.optional(Schema.Boolean),
  safetyDividersException: Schema.optional(Schema.String),
  sharedAreasLimitedOccupancyException: Schema.optional(Schema.String),
  commonAreasPhysicalDistancingArranged: Schema.optional(Schema.Boolean),
  safetyDividers: Schema.optional(Schema.Boolean),
  commonAreasPhysicalDistancingArrangedException: Schema.optional(Schema.String),
})).annotate({ identifier: "PhysicalDistancing" }) as any as Schema.Schema<PhysicalDistancing>;

export interface EnhancedCleaning {
  /** Employees trained in thorough hand-washing. */
  employeesTrainedThoroughHandWashing?: boolean;
  /** Employees wear masks, face shields, and/or gloves. */
  employeesWearProtectiveEquipment?: boolean;
  /** Employees wear protective equipment exception. */
  employeesWearProtectiveEquipmentException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Employees trained thorough hand washing exception. */
  employeesTrainedThoroughHandWashingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Enhanced cleaning of common areas. */
  commonAreasEnhancedCleaning?: boolean;
  /** Guest rooms enhanced cleaning exception. */
  guestRoomsEnhancedCleaningException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Employees trained cleaning procedures exception. */
  employeesTrainedCleaningProceduresException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Enhanced cleaning of guest rooms. */
  guestRoomsEnhancedCleaning?: boolean;
  /** Common areas enhanced cleaning exception. */
  commonAreasEnhancedCleaningException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Commercial grade disinfectant cleaning exception. */
  commercialGradeDisinfectantCleaningException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Commercial-grade disinfectant used to clean the property. */
  commercialGradeDisinfectantCleaning?: boolean;
  /** Employees trained in COVID-19 cleaning procedures. */
  employeesTrainedCleaningProcedures?: boolean;
}

export const EnhancedCleaning: Schema.Schema<EnhancedCleaning> = Schema.suspend(() => Schema.Struct({
  employeesTrainedThoroughHandWashing: Schema.optional(Schema.Boolean),
  employeesWearProtectiveEquipment: Schema.optional(Schema.Boolean),
  employeesWearProtectiveEquipmentException: Schema.optional(Schema.String),
  employeesTrainedThoroughHandWashingException: Schema.optional(Schema.String),
  commonAreasEnhancedCleaning: Schema.optional(Schema.Boolean),
  guestRoomsEnhancedCleaningException: Schema.optional(Schema.String),
  employeesTrainedCleaningProceduresException: Schema.optional(Schema.String),
  guestRoomsEnhancedCleaning: Schema.optional(Schema.Boolean),
  commonAreasEnhancedCleaningException: Schema.optional(Schema.String),
  commercialGradeDisinfectantCleaningException: Schema.optional(Schema.String),
  commercialGradeDisinfectantCleaning: Schema.optional(Schema.Boolean),
  employeesTrainedCleaningProcedures: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnhancedCleaning" }) as any as Schema.Schema<EnhancedCleaning>;

export interface PersonalProtection {
  /** In-room hygiene kits with masks, hand sanitizer, and/or antibacterial wipes. */
  guestRoomHygieneKitsAvailable?: boolean;
  /** Guest room hygiene kits available exception. */
  guestRoomHygieneKitsAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Face mask required exception. */
  faceMaskRequiredException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Hand-sanitizer and/or sanitizing wipes are offered in common areas. */
  commonAreasOfferSanitizingItems?: boolean;
  /** Masks required on the property. */
  faceMaskRequired?: boolean;
  /** Common areas offer sanitizing items exception. */
  commonAreasOfferSanitizingItemsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Masks and/or gloves available for guests. */
  protectiveEquipmentAvailable?: boolean;
  /** Protective equipment available exception. */
  protectiveEquipmentAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const PersonalProtection: Schema.Schema<PersonalProtection> = Schema.suspend(() => Schema.Struct({
  guestRoomHygieneKitsAvailable: Schema.optional(Schema.Boolean),
  guestRoomHygieneKitsAvailableException: Schema.optional(Schema.String),
  faceMaskRequiredException: Schema.optional(Schema.String),
  commonAreasOfferSanitizingItems: Schema.optional(Schema.Boolean),
  faceMaskRequired: Schema.optional(Schema.Boolean),
  commonAreasOfferSanitizingItemsException: Schema.optional(Schema.String),
  protectiveEquipmentAvailable: Schema.optional(Schema.Boolean),
  protectiveEquipmentAvailableException: Schema.optional(Schema.String),
})).annotate({ identifier: "PersonalProtection" }) as any as Schema.Schema<PersonalProtection>;

export interface IncreasedFoodSafety {
  /** Food preparation and serving additional safety exception. */
  foodPreparationAndServingAdditionalSafetyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Disposable flatware. */
  disposableFlatware?: boolean;
  /** Disposable flatware exception. */
  disposableFlatwareException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Additional safety measures during food prep and serving. */
  foodPreparationAndServingAdditionalSafety?: boolean;
  /** Individually-packaged meals. */
  individualPackagedMeals?: boolean;
  /** Single use food menus exception. */
  singleUseFoodMenusException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Individual packaged meals exception. */
  individualPackagedMealsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Additional sanitation in dining areas. */
  diningAreasAdditionalSanitation?: boolean;
  /** Single-use menus. */
  singleUseFoodMenus?: boolean;
  /** Dining areas additional sanitation exception. */
  diningAreasAdditionalSanitationException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const IncreasedFoodSafety: Schema.Schema<IncreasedFoodSafety> = Schema.suspend(() => Schema.Struct({
  foodPreparationAndServingAdditionalSafetyException: Schema.optional(Schema.String),
  disposableFlatware: Schema.optional(Schema.Boolean),
  disposableFlatwareException: Schema.optional(Schema.String),
  foodPreparationAndServingAdditionalSafety: Schema.optional(Schema.Boolean),
  individualPackagedMeals: Schema.optional(Schema.Boolean),
  singleUseFoodMenusException: Schema.optional(Schema.String),
  individualPackagedMealsException: Schema.optional(Schema.String),
  diningAreasAdditionalSanitation: Schema.optional(Schema.Boolean),
  singleUseFoodMenus: Schema.optional(Schema.Boolean),
  diningAreasAdditionalSanitationException: Schema.optional(Schema.String),
})).annotate({ identifier: "IncreasedFoodSafety" }) as any as Schema.Schema<IncreasedFoodSafety>;

export interface HealthAndSafety {
  /** Minimized contact measures implemented by the hotel during COVID-19. */
  minimizedContact?: MinimizedContact;
  /** Physical distancing measures implemented by the hotel during COVID-19. */
  physicalDistancing?: PhysicalDistancing;
  /** Enhanced cleaning measures implemented by the hotel during COVID-19. */
  enhancedCleaning?: EnhancedCleaning;
  /** Personal protection measures implemented by the hotel during COVID-19. */
  personalProtection?: PersonalProtection;
  /** Increased food safety measures implemented by the hotel during COVID-19. */
  increasedFoodSafety?: IncreasedFoodSafety;
}

export const HealthAndSafety: Schema.Schema<HealthAndSafety> = Schema.suspend(() => Schema.Struct({
  minimizedContact: Schema.optional(MinimizedContact),
  physicalDistancing: Schema.optional(PhysicalDistancing),
  enhancedCleaning: Schema.optional(EnhancedCleaning),
  personalProtection: Schema.optional(PersonalProtection),
  increasedFoodSafety: Schema.optional(IncreasedFoodSafety),
})).annotate({ identifier: "HealthAndSafety" }) as any as Schema.Schema<HealthAndSafety>;

export interface EcoCertification {
  /** Required. The eco certificate. */
  ecoCertificate?: "ECO_CERTIFICATE_UNSPECIFIED" | "ISO14001" | "ISO50001" | "ASIAN_ECOTOURISM" | "BIOSPHERE_RESPOSNIBLE_TOURISM" | "BUREAU_VERITAS" | "CONTROL_UNION" | "EARTHCHECK" | "ECO_CERTIFICATION_MALTA" | "ECOTOURISM_AUSTRALIAS_ECO" | "GREAT_GREEN_DEAL" | "GREEN_GLOBE" | "GREEN_GROWTH2050" | "GREEN_KEY" | "GREEN_KEY_ECO_RATING" | "GREEN_SEAL" | "GREEN_STAR" | "GREEN_TOURISM_ACTIVE" | "HILTON_LIGHTSTAY" | "HOSTELLING_INTERNATIONALS_QUALITY_AND_SUSTAINABILITY" | "HOTELES_MAS_VERDES" | "NORDIC_SWAN_ECOLABEL" | "PREFERRED_BY_NATURE_SUSTAINABLE_TOURISM" | "SUSTAINABLE_TRAVEL_IRELAND" | "TOF_TIGERS_INITITIVES_PUG" | "TRAVELIFE" | "UNITED_CERTIFICATION_SYSTEMS_LIMITED" | "VIREO_SRL" | (string & {});
  /** Whether the eco certificate was awarded or not. */
  awarded?: boolean;
  /** Awarded exception. */
  awardedException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const EcoCertification: Schema.Schema<EcoCertification> = Schema.suspend(() => Schema.Struct({
  ecoCertificate: Schema.optional(Schema.String),
  awarded: Schema.optional(Schema.Boolean),
  awardedException: Schema.optional(Schema.String),
})).annotate({ identifier: "EcoCertification" }) as any as Schema.Schema<EcoCertification>;

export interface SustainabilityCertifications {
  /** BREEAM certification. */
  breeamCertification?: "BREEAM_CERTIFICATION_UNSPECIFIED" | "NO_BREEAM_CERTIFICATION" | "BREEAM_PASS" | "BREEAM_GOOD" | "BREEAM_VERY_GOOD" | "BREEAM_EXCELLENT" | "BREEAM_OUTSTANDING" | (string & {});
  /** The eco certificates awarded to the hotel. */
  ecoCertifications?: Array<EcoCertification>;
  /** LEED certification. */
  leedCertification?: "LEED_CERTIFICATION_UNSPECIFIED" | "NO_LEED_CERTIFICATION" | "LEED_CERTIFIED" | "LEED_SILVER" | "LEED_GOLD" | "LEED_PLATINUM" | (string & {});
  /** LEED certification exception. */
  leedCertificationException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** BREEAM certification exception. */
  breeamCertificationException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const SustainabilityCertifications: Schema.Schema<SustainabilityCertifications> = Schema.suspend(() => Schema.Struct({
  breeamCertification: Schema.optional(Schema.String),
  ecoCertifications: Schema.optional(Schema.Array(EcoCertification)),
  leedCertification: Schema.optional(Schema.String),
  leedCertificationException: Schema.optional(Schema.String),
  breeamCertificationException: Schema.optional(Schema.String),
})).annotate({ identifier: "SustainabilityCertifications" }) as any as Schema.Schema<SustainabilityCertifications>;

export interface EnergyEfficiency {
  /** Energy conservation program exception. */
  energyConservationProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Energy saving thermostats exception. */
  energySavingThermostatsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Independent organization audits energy use. The property conducts an energy audit at least every 5 years, the results of which are either verified by a third-party and/or published in external communications. An energy audit is a detailed assessment of the facility which provides recommendations to existing operations and procedures to improve energy efficiency, available incentives or rebates,and opportunities for improvements through renovations or upgrades. Examples of organizations that conduct credible third party audits include: Engie Impact, DNV GL (EU), Dexma, and local utility providers (they often provide energy and water audits). */
  independentOrganizationAuditsEnergyUse?: boolean;
  /** Independent organization audits energy use exception. */
  independentOrganizationAuditsEnergyUseException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Output only. Green building design. True if the property has been awarded a relevant certification. */
  greenBuildingDesign?: boolean;
  /** Energy saving thermostats. The property installed energy-saving thermostats throughout the building to conserve energy when rooms or areas are not in use. Energy-saving thermostats are devices that control heating/cooling in the building by learning temperature preferences and automatically adjusting to energy-saving temperatures as the default. The thermostats are automatically set to a temperature between 68-78 degrees F (20-26 °C), depending on seasonality. In the winter, set the thermostat to 68°F (20°C) when the room is occupied, lowering room temperature when unoccupied. In the summer, set the thermostat to 78°F (26°C) when the room is occupied. */
  energySavingThermostats?: boolean;
  /** Carbon free energy sources. Property sources carbon-free electricity via at least one of the following methods: on-site clean energy generation, power purchase agreement(s) with clean energy generators, green power provided by electricity supplier, or purchases of Energy Attribute Certificates (such as Renewable Energy Certificates or Guarantees of Origin). */
  carbonFreeEnergySources?: boolean;
  /** Output only. Green building design exception. */
  greenBuildingDesignException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Energy efficient heating and cooling systems exception. */
  energyEfficientHeatingAndCoolingSystemsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Energy efficient lighting exception. */
  energyEfficientLightingException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Energy efficient lighting. At least 75% of the property's lighting is energy efficient, using lighting that is more than 45 lumens per watt – typically LED or CFL lightbulbs. */
  energyEfficientLighting?: boolean;
  /** Energy efficient heating and cooling systems. The property doesn't use chlorofluorocarbon (CFC)-based refrigerants in heating, ventilating, and air-conditioning systems unless a third-party audit shows it's not economically feasible. The CFC-based refrigerants which are used should have a Global Warming Potential (GWP) ≤ 10. The property uses occupancy sensors on HVAC systems in back-of-house spaces, meeting rooms, and other low-traffic areas. */
  energyEfficientHeatingAndCoolingSystems?: boolean;
  /** Carbon free energy sources exception. */
  carbonFreeEnergySourcesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Energy conservation program. The property tracks corporate-level Scope 1 and 2 GHG emissions, and Scope 3 emissions if available. The property has a commitment to implement initiatives that reduce GHG emissions year over year. The property has shown an absolute reduction in emissions for at least 2 years. Emissions are either verfied by a third-party and/or published in external communications. */
  energyConservationProgram?: boolean;
}

export const EnergyEfficiency: Schema.Schema<EnergyEfficiency> = Schema.suspend(() => Schema.Struct({
  energyConservationProgramException: Schema.optional(Schema.String),
  energySavingThermostatsException: Schema.optional(Schema.String),
  independentOrganizationAuditsEnergyUse: Schema.optional(Schema.Boolean),
  independentOrganizationAuditsEnergyUseException: Schema.optional(Schema.String),
  greenBuildingDesign: Schema.optional(Schema.Boolean),
  energySavingThermostats: Schema.optional(Schema.Boolean),
  carbonFreeEnergySources: Schema.optional(Schema.Boolean),
  greenBuildingDesignException: Schema.optional(Schema.String),
  energyEfficientHeatingAndCoolingSystemsException: Schema.optional(Schema.String),
  energyEfficientLightingException: Schema.optional(Schema.String),
  energyEfficientLighting: Schema.optional(Schema.Boolean),
  energyEfficientHeatingAndCoolingSystems: Schema.optional(Schema.Boolean),
  carbonFreeEnergySourcesException: Schema.optional(Schema.String),
  energyConservationProgram: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "EnergyEfficiency" }) as any as Schema.Schema<EnergyEfficiency>;

export interface WasteReduction {
  /** Safely disposes lightbulbs. The property safely stores and disposes lightbulbs. */
  safelyDisposesLightbulbs?: boolean;
  /** Food waste reduction program exception. */
  foodWasteReductionProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** No single use plastic water bottles. The property bans single-use plastic water bottles. */
  noSingleUsePlasticWaterBottles?: boolean;
  /** Safely disposes batteries. The property safely stores and disposes batteries. */
  safelyDisposesBatteries?: boolean;
  /** Refillable toiletry containers. The property has replaced miniature individual containers with refillable amenity dispensers for shampoo, conditioner, soap, and lotion. */
  refillableToiletryContainers?: boolean;
  /** No styrofoam food containers. The property eliminates the use of Styrofoam in disposable food service items. */
  noStyrofoamFoodContainers?: boolean;
  /** No styrofoam food containers exception. */
  noStyrofoamFoodContainersException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Safely handles hazardous substances. The property has a hazardous waste management program aligned wit GreenSeal and LEED requirements, and meets all regulatory requirements for hazardous waste disposal and recycling. Hazardous means substances that are classified as "hazardous" by an authoritative body (such as OSHA or DOT), are labeled with signal words such as "Danger," "Caution," "Warning," or are flammable, corrosive, or ignitable. Requirements include: - The property shall maintain records of the efforts it has made to replace the hazardous substances it uses with less hazardous alternatives. - An inventory of the hazardous materials stored on-site. - Products intended for cleaning, dishwashing, laundry, and pool maintenance shall be stored in clearly labeled containers. These containers shall be checked regularly for leaks, and replaced a necessary. - Spill containment devices shall be installed to collect spills, drips, or leaching of chemicals. */
  safelyHandlesHazardousSubstances?: boolean;
  /** Food waste reduction program. The property has established a food waste reduction and donation program, aiming to reduce food waste by half. These programs typically use tools such as the Hotel Kitchen Toolkit and others to track waste and measure progress. */
  foodWasteReductionProgram?: boolean;
  /** Donates excess food. The property has a program and/or policy for diverting waste from landfill that may include efforts to donate for human consumption or divert food for animal feed. */
  donatesExcessFood?: boolean;
  /** Safely disposes electronics. The property has a reputable recycling program that keeps hazardous electronic parts and chemical compounds out of landfills, dumps and other unauthorized abandonment sites, and recycles/reuses applicable materials. (e.g. certified electronics recyclers). */
  safelyDisposesElectronics?: boolean;
  /** Refillable toiletry containers exception. */
  refillableToiletryContainersException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water bottle filling stations. The property offers water stations throughout the building for guest use. */
  waterBottleFillingStations?: boolean;
  /** Recycling program exception. */
  recyclingProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Safely disposes electronics exception. */
  safelyDisposesElectronicsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Recycling program. The property has a recycling program, aligned with LEED waste requirements, and a policy outlining efforts to send less than 50% of waste to landfill. The recycling program includes storage locations for recyclable materials, including mixed paper, corrugated cardboard, glass, plastics, and metals. */
  recyclingProgram?: boolean;
  /** Toiletry donation program exception. */
  toiletryDonationProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Safely handles hazardous substances exception. */
  safelyHandlesHazardousSubstancesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Safely disposes lightbulbs exception. */
  safelyDisposesLightbulbsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Composts excess food exception. */
  compostsExcessFoodException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** No single use plastic straws exception. */
  noSingleUsePlasticStrawsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Soap donation program exception. */
  soapDonationProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Safely disposes batteries exception. */
  safelyDisposesBatteriesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** No single use plastic straws. The property bans single-use plastic straws. */
  noSingleUsePlasticStraws?: boolean;
  /** Compostable food containers and cutlery. 100% of food service containers and to-go cutlery are compostable, and reusable utensils are offered wherever possible. Compostable materials are capable of undergoing biological decomposition in a compost site, such that material is not visually distinguishable and breaks down into carbon dioxide, water, inorganic compounds, and biomass. */
  compostableFoodContainersAndCutlery?: boolean;
  /** Composts excess food. The property has a program and/or policy for diverting waste from landfill by composting food and yard waste, either through compost collection and off-site processing or on-site compost processing. */
  compostsExcessFood?: boolean;
  /** Toiletry donation program. The property participates in a toiletry donation program such as Clean the World or something similar. */
  toiletryDonationProgram?: boolean;
  /** Soap donation program. The property participates in a soap donation program such as Clean the World or something similar. */
  soapDonationProgram?: boolean;
  /** Donates excess food exception. */
  donatesExcessFoodException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water bottle filling stations exception. */
  waterBottleFillingStationsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Compostable food containers and cutlery exception. */
  compostableFoodContainersAndCutleryException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** No single use plastic water bottles exception. */
  noSingleUsePlasticWaterBottlesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const WasteReduction: Schema.Schema<WasteReduction> = Schema.suspend(() => Schema.Struct({
  safelyDisposesLightbulbs: Schema.optional(Schema.Boolean),
  foodWasteReductionProgramException: Schema.optional(Schema.String),
  noSingleUsePlasticWaterBottles: Schema.optional(Schema.Boolean),
  safelyDisposesBatteries: Schema.optional(Schema.Boolean),
  refillableToiletryContainers: Schema.optional(Schema.Boolean),
  noStyrofoamFoodContainers: Schema.optional(Schema.Boolean),
  noStyrofoamFoodContainersException: Schema.optional(Schema.String),
  safelyHandlesHazardousSubstances: Schema.optional(Schema.Boolean),
  foodWasteReductionProgram: Schema.optional(Schema.Boolean),
  donatesExcessFood: Schema.optional(Schema.Boolean),
  safelyDisposesElectronics: Schema.optional(Schema.Boolean),
  refillableToiletryContainersException: Schema.optional(Schema.String),
  waterBottleFillingStations: Schema.optional(Schema.Boolean),
  recyclingProgramException: Schema.optional(Schema.String),
  safelyDisposesElectronicsException: Schema.optional(Schema.String),
  recyclingProgram: Schema.optional(Schema.Boolean),
  toiletryDonationProgramException: Schema.optional(Schema.String),
  safelyHandlesHazardousSubstancesException: Schema.optional(Schema.String),
  safelyDisposesLightbulbsException: Schema.optional(Schema.String),
  compostsExcessFoodException: Schema.optional(Schema.String),
  noSingleUsePlasticStrawsException: Schema.optional(Schema.String),
  soapDonationProgramException: Schema.optional(Schema.String),
  safelyDisposesBatteriesException: Schema.optional(Schema.String),
  noSingleUsePlasticStraws: Schema.optional(Schema.Boolean),
  compostableFoodContainersAndCutlery: Schema.optional(Schema.Boolean),
  compostsExcessFood: Schema.optional(Schema.Boolean),
  toiletryDonationProgram: Schema.optional(Schema.Boolean),
  soapDonationProgram: Schema.optional(Schema.Boolean),
  donatesExcessFoodException: Schema.optional(Schema.String),
  waterBottleFillingStationsException: Schema.optional(Schema.String),
  compostableFoodContainersAndCutleryException: Schema.optional(Schema.String),
  noSingleUsePlasticWaterBottlesException: Schema.optional(Schema.String),
})).annotate({ identifier: "WasteReduction" }) as any as Schema.Schema<WasteReduction>;

export interface SustainableSourcing {
  /** Responsibly sources seafood exception. */
  responsiblySourcesSeafoodException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Vegan meals. The property provides vegan menu options for guests. Vegan food does not contain animal products or byproducts. */
  veganMeals?: boolean;
  /** Responsible purchasing policy. The property has a responsible procurement policy in place. Responsible means integration of social, ethical, and/or environmental performance factors into the procurement process when selecting suppliers. */
  responsiblePurchasingPolicy?: boolean;
  /** Responsible purchasing policy exception. */
  responsiblePurchasingPolicyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Vegan meals exception. */
  veganMealsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Organic food and beverages exception. */
  organicFoodAndBeveragesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Organic cage free eggs. The property sources 100% certified organic and cage-free eggs (shell, liquid, and egg products). Cage-free means hens are able to walk, spread their wings and lay their eggs in nests). */
  organicCageFreeEggs?: boolean;
  /** Organic cage free eggs exception. */
  organicCageFreeEggsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Responsibly sources seafood. The property does not source seafood from the Monterey Bay Aquarium Seafood Watch "avoid" list, and must sustainably source seafood listed as "good alternative," "eco-certified," and "best choice". The property has a policy outlining a commitment to source Marine Stewardship Council (MSC) and/or Aquaculture Stewardship Council (ASC) Chain of Custody certified seafood. */
  responsiblySourcesSeafood?: boolean;
  /** Eco friendly toiletries. Soap, shampoo, lotion, and other toiletries provided for guests have a nationally or internationally recognized sustainability certification, such as USDA Organic, EU Organic, or cruelty-free. */
  ecoFriendlyToiletries?: boolean;
  /** Locally sourced food and beverages. Property sources locally in order to lower the environmental footprint from reduced transportation and to stimulate the local economy. Products produced less than 62 miles from the establishment are normally considered as locally produced. */
  locallySourcedFoodAndBeverages?: boolean;
  /** Organic food and beverages. At least 25% of food and beverages, by spend, are certified organic. Organic means products that are certified to one of the organic standard listed in the IFOAM family of standards. Qualifying certifications include USDA Organic and EU Organic, among others. */
  organicFoodAndBeverages?: boolean;
  /** Locally sourced food and beverages exception. */
  locallySourcedFoodAndBeveragesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Vegetarian meals exception. */
  vegetarianMealsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Vegetarian meals. The property provides vegetarian menu options for guests. Vegetarian food does not contain meat, poultry, fish, or seafood. */
  vegetarianMeals?: boolean;
  /** Eco friendly toiletries exception. */
  ecoFriendlyToiletriesException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const SustainableSourcing: Schema.Schema<SustainableSourcing> = Schema.suspend(() => Schema.Struct({
  responsiblySourcesSeafoodException: Schema.optional(Schema.String),
  veganMeals: Schema.optional(Schema.Boolean),
  responsiblePurchasingPolicy: Schema.optional(Schema.Boolean),
  responsiblePurchasingPolicyException: Schema.optional(Schema.String),
  veganMealsException: Schema.optional(Schema.String),
  organicFoodAndBeveragesException: Schema.optional(Schema.String),
  organicCageFreeEggs: Schema.optional(Schema.Boolean),
  organicCageFreeEggsException: Schema.optional(Schema.String),
  responsiblySourcesSeafood: Schema.optional(Schema.Boolean),
  ecoFriendlyToiletries: Schema.optional(Schema.Boolean),
  locallySourcedFoodAndBeverages: Schema.optional(Schema.Boolean),
  organicFoodAndBeverages: Schema.optional(Schema.Boolean),
  locallySourcedFoodAndBeveragesException: Schema.optional(Schema.String),
  vegetarianMealsException: Schema.optional(Schema.String),
  vegetarianMeals: Schema.optional(Schema.Boolean),
  ecoFriendlyToiletriesException: Schema.optional(Schema.String),
})).annotate({ identifier: "SustainableSourcing" }) as any as Schema.Schema<SustainableSourcing>;

export interface WaterConservation {
  /** Water saving sinks exception. */
  waterSavingSinksException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water saving showers exception. */
  waterSavingShowersException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Independent organization audits water use exception. */
  independentOrganizationAuditsWaterUseException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water saving sinks. All of the property's guest rooms have bathroom faucets that use a maximum of 1.5 gallons per minute (gpm), public restroom faucets do not exceed 0.5 gpm, and kitchen faucets (excluding faucets used exclusively for filling operations) do not exceed 2.2 gpm. */
  waterSavingSinks?: boolean;
  /** Towel reuse program exception. */
  towelReuseProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Linen reuse program exception. */
  linenReuseProgramException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water saving toilets. All of the property's toilets use 1.6 gallons per flush, or less. */
  waterSavingToilets?: boolean;
  /** Independent organization audits water use. The property conducts a water conservation audit every 5 years, the results of which are either verified by a third-party and/or published in external communications. A water conservation audit is a detailed assessment of the facility, providing recommendations to existing operations and procedures to improve water efficiency, available incentives or rebates, and opportunities for improvements through renovations or upgrades. Examples of organizations who conduct credible third party audits include: Engie Impact, and local utility providers (they often provide energy and water audits). */
  independentOrganizationAuditsWaterUse?: boolean;
  /** Linen reuse program. The property offers a linen reuse program. */
  linenReuseProgram?: boolean;
  /** Water saving showers. All of the property's guest rooms have shower heads that use no more than 2.0 gallons per minute (gpm). */
  waterSavingShowers?: boolean;
  /** Water saving toilets exception. */
  waterSavingToiletsException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Towel reuse program. The property offers a towel reuse program. */
  towelReuseProgram?: boolean;
}

export const WaterConservation: Schema.Schema<WaterConservation> = Schema.suspend(() => Schema.Struct({
  waterSavingSinksException: Schema.optional(Schema.String),
  waterSavingShowersException: Schema.optional(Schema.String),
  independentOrganizationAuditsWaterUseException: Schema.optional(Schema.String),
  waterSavingSinks: Schema.optional(Schema.Boolean),
  towelReuseProgramException: Schema.optional(Schema.String),
  linenReuseProgramException: Schema.optional(Schema.String),
  waterSavingToilets: Schema.optional(Schema.Boolean),
  independentOrganizationAuditsWaterUse: Schema.optional(Schema.Boolean),
  linenReuseProgram: Schema.optional(Schema.Boolean),
  waterSavingShowers: Schema.optional(Schema.Boolean),
  waterSavingToiletsException: Schema.optional(Schema.String),
  towelReuseProgram: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "WaterConservation" }) as any as Schema.Schema<WaterConservation>;

export interface Sustainability {
  /** Sustainability certifications the hotel has been awarded. Deprecated: this field is no longer populated. All certification data is now provided by BeCause. */
  sustainabilityCertifications?: SustainabilityCertifications;
  /** Energy efficiency practices implemented at the hotel. */
  energyEfficiency?: EnergyEfficiency;
  /** Waste reduction practices implemented at the hotel. */
  wasteReduction?: WasteReduction;
  /** Sustainable sourcing practices implemented at the hotel. */
  sustainableSourcing?: SustainableSourcing;
  /** Water conservation practices implemented at the hotel. */
  waterConservation?: WaterConservation;
}

export const Sustainability: Schema.Schema<Sustainability> = Schema.suspend(() => Schema.Struct({
  sustainabilityCertifications: Schema.optional(SustainabilityCertifications),
  energyEfficiency: Schema.optional(EnergyEfficiency),
  wasteReduction: Schema.optional(WasteReduction),
  sustainableSourcing: Schema.optional(SustainableSourcing),
  waterConservation: Schema.optional(WaterConservation),
})).annotate({ identifier: "Sustainability" }) as any as Schema.Schema<Sustainability>;

export interface GuestUnitType {
  /** Features and available amenities of the GuestUnitType. */
  features?: GuestUnitFeatures;
  /** Required. Unit or room code identifiers for a single GuestUnitType. Each code must be unique within a Lodging instance. */
  codes?: Array<string>;
  /** Required. Short, English label or name of the GuestUnitType. Target <50 chars. */
  label?: string;
}

export const GuestUnitType: Schema.Schema<GuestUnitType> = Schema.suspend(() => Schema.Struct({
  features: Schema.optional(GuestUnitFeatures),
  codes: Schema.optional(Schema.Array(Schema.String)),
  label: Schema.optional(Schema.String),
})).annotate({ identifier: "GuestUnitType" }) as any as Schema.Schema<GuestUnitType>;

export interface Transportation {
  /** Transfer exception. */
  transferException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Private car service. Hotel provides a private chauffeured car to transport guests to destinations. Passengers in the car are either alone or are known to one another and have requested the car together. Service can be free or for a fee and travel distance is usually limited to a specific range. Not a taxi. */
  privateCarService?: boolean;
  /** Free private car service exception. */
  freePrivateCarServiceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free airport shuttle exception. */
  freeAirportShuttleException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Car rental on property exception. */
  carRentalOnPropertyException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Car rental on property. A branch of a rental car company with a processing desk in the hotel. Available cars for rent may be awaiting at the hotel or in a nearby lot. */
  carRentalOnProperty?: boolean;
  /** Private car service exception. */
  privateCarServiceException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free airport shuttle. Airport shuttle is free to guests. Must be free to all guests without any conditions. */
  freeAirportShuttle?: boolean;
  /** Airport shuttle exception. */
  airportShuttleException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Local shuttle. A car, van or bus provided by the hotel to transport guests to destinations within a specified range of distance around the hotel. Usually shopping and/or convention centers, downtown districts, or beaches. Can be free or for a fee. */
  localShuttle?: boolean;
  /** Airport shuttle. The hotel provides guests with a chauffeured van or bus to and from the airport. Can be free or for a fee. Guests may share the vehicle with other guests unknown to them. Applies if the hotel has a third-party shuttle service (office/desk etc.) within the hotel. As long as hotel provides this service, it doesn't matter if it's directly with them or a third party they work with. Does not apply if guest has to coordinate with an entity outside/other than the hotel. */
  airportShuttle?: boolean;
  /** Local shuttle exception. */
  localShuttleException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Transfer. Hotel provides a shuttle service or car service to take guests to and from the nearest airport or train station. Can be free or for a fee. Guests may share the vehicle with other guests unknown to them. */
  transfer?: boolean;
  /** Free private car service. Private chauffeured car service is free to guests. */
  freePrivateCarService?: boolean;
}

export const Transportation: Schema.Schema<Transportation> = Schema.suspend(() => Schema.Struct({
  transferException: Schema.optional(Schema.String),
  privateCarService: Schema.optional(Schema.Boolean),
  freePrivateCarServiceException: Schema.optional(Schema.String),
  freeAirportShuttleException: Schema.optional(Schema.String),
  carRentalOnPropertyException: Schema.optional(Schema.String),
  carRentalOnProperty: Schema.optional(Schema.Boolean),
  privateCarServiceException: Schema.optional(Schema.String),
  freeAirportShuttle: Schema.optional(Schema.Boolean),
  airportShuttleException: Schema.optional(Schema.String),
  localShuttle: Schema.optional(Schema.Boolean),
  airportShuttle: Schema.optional(Schema.Boolean),
  localShuttleException: Schema.optional(Schema.String),
  transfer: Schema.optional(Schema.Boolean),
  freePrivateCarService: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Transportation" }) as any as Schema.Schema<Transportation>;

export interface Connectivity {
  /** Wifi available. The hotel provides the ability for guests to wirelessly connect to the internet. Can be in the public areas of the hotel and/or in the guest rooms. Can be free or for a fee. */
  wifiAvailable?: boolean;
  /** Wifi available exception. */
  wifiAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Public internet terminal exception. */
  publicInternetTerminalException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Public internet terminal. An area of the hotel supplied with computers and designated for the purpose of providing guests with the ability to access the internet. */
  publicInternetTerminal?: boolean;
  /** Free wifi. The hotel offers guests wifi for free. */
  freeWifi?: boolean;
  /** Public area wifi available. Guests have the ability to wirelessly connect to the internet in the areas of the hotel accessible to anyone. Can be free or for a fee. */
  publicAreaWifiAvailable?: boolean;
  /** Public area wifi available exception. */
  publicAreaWifiAvailableException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Free wifi exception. */
  freeWifiException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Connectivity: Schema.Schema<Connectivity> = Schema.suspend(() => Schema.Struct({
  wifiAvailable: Schema.optional(Schema.Boolean),
  wifiAvailableException: Schema.optional(Schema.String),
  publicInternetTerminalException: Schema.optional(Schema.String),
  publicInternetTerminal: Schema.optional(Schema.Boolean),
  freeWifi: Schema.optional(Schema.Boolean),
  publicAreaWifiAvailable: Schema.optional(Schema.Boolean),
  publicAreaWifiAvailableException: Schema.optional(Schema.String),
  freeWifiException: Schema.optional(Schema.String),
})).annotate({ identifier: "Connectivity" }) as any as Schema.Schema<Connectivity>;

export interface Pools {
  /** Indoor pools count. The sum of all indoor pools at the hotel. */
  indoorPoolsCount?: number;
  /** Wading pool exception. */
  wadingPoolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Outdoor pool. A pool located outside on the grounds of the hotel and available for guests to use for swimming, soaking or recreation. Use may or may not be restricted to adults and/or children. */
  outdoorPool?: boolean;
  /** Outdoor pool exception. */
  outdoorPoolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Wading pool. A shallow pool designed for small children to play in. Can be indoors or outdoors. Also known as kiddie pool. */
  wadingPool?: boolean;
  /** Lifeguard exception. */
  lifeguardException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Pools count. The sum of all pools at the hotel. */
  poolsCount?: number;
  /** Indoor pool exception. */
  indoorPoolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Pool. The presence of a pool, either indoors or outdoors, for guests to use for swimming and/or soaking. Use may or may not be restricted to adults and/or children. */
  pool?: boolean;
  /** Pool exception. */
  poolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Indoor pools count exception. */
  indoorPoolsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Lazy river exception. */
  lazyRiverException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Adult pool exception. */
  adultPoolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Lifeguard. A trained member of the hotel staff stationed by the hotel's indoor or outdoor swimming area and responsible for the safety of swimming guests. */
  lifeguard?: boolean;
  /** Waterslide exception. */
  waterslideException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Indoor pool. A pool located inside the hotel and available for guests to use for swimming and/or soaking. Use may or may not be restricted to adults and/or children. */
  indoorPool?: boolean;
  /** Hot tub. A man-made pool containing bubbling water maintained at a higher temperature and circulated by aerating jets for the purpose of soaking, relaxation and hydrotherapy. Can be indoors or outdoors. Not used for active swimming. Also known as Jacuzzi. Hot tub must be in a common area where all guests can access it. Does not apply to room-specific hot tubs that are only accessible to guest occupying that room. */
  hotTub?: boolean;
  /** Lazy river. A man-made pool or several interconnected recreational pools built to mimic the shape and current of a winding river where guests float in the water on inflated rubber tubes. Can be indoors or outdoors. */
  lazyRiver?: boolean;
  /** Outdoor pools count exception. */
  outdoorPoolsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Wave pool. A large indoor or outdoor pool with a machine that produces water currents to mimic the ocean's crests. */
  wavePool?: boolean;
  /** Hot tub exception. */
  hotTubException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water park exception. */
  waterParkException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Water park. An aquatic recreation area with a large pool or series of pools that has features such as a water slide or tube, wavepool, fountains, rope swings, and/or obstacle course. Can be indoors or outdoors. Also known as adventure pool. */
  waterPark?: boolean;
  /** Outdoor pools count. The sum of all outdoor pools at the hotel. */
  outdoorPoolsCount?: number;
  /** Adult pool. A pool restricted for use by adults only. Can be indoors or outdoors. */
  adultPool?: boolean;
  /** Pools count exception. */
  poolsCountException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
  /** Waterslide. A continuously wetted chute positioned by an indoor or outdoor pool which people slide down into the water. */
  waterslide?: boolean;
  /** Wave pool exception. */
  wavePoolException?: "EXCEPTION_UNSPECIFIED" | "UNDER_CONSTRUCTION" | "DEPENDENT_ON_SEASON" | "DEPENDENT_ON_DAY_OF_WEEK" | (string & {});
}

export const Pools: Schema.Schema<Pools> = Schema.suspend(() => Schema.Struct({
  indoorPoolsCount: Schema.optional(Schema.Number),
  wadingPoolException: Schema.optional(Schema.String),
  outdoorPool: Schema.optional(Schema.Boolean),
  outdoorPoolException: Schema.optional(Schema.String),
  wadingPool: Schema.optional(Schema.Boolean),
  lifeguardException: Schema.optional(Schema.String),
  poolsCount: Schema.optional(Schema.Number),
  indoorPoolException: Schema.optional(Schema.String),
  pool: Schema.optional(Schema.Boolean),
  poolException: Schema.optional(Schema.String),
  indoorPoolsCountException: Schema.optional(Schema.String),
  lazyRiverException: Schema.optional(Schema.String),
  adultPoolException: Schema.optional(Schema.String),
  lifeguard: Schema.optional(Schema.Boolean),
  waterslideException: Schema.optional(Schema.String),
  indoorPool: Schema.optional(Schema.Boolean),
  hotTub: Schema.optional(Schema.Boolean),
  lazyRiver: Schema.optional(Schema.Boolean),
  outdoorPoolsCountException: Schema.optional(Schema.String),
  wavePool: Schema.optional(Schema.Boolean),
  hotTubException: Schema.optional(Schema.String),
  waterParkException: Schema.optional(Schema.String),
  waterPark: Schema.optional(Schema.Boolean),
  outdoorPoolsCount: Schema.optional(Schema.Number),
  adultPool: Schema.optional(Schema.Boolean),
  poolsCountException: Schema.optional(Schema.String),
  waterslide: Schema.optional(Schema.Boolean),
  wavePoolException: Schema.optional(Schema.String),
})).annotate({ identifier: "Pools" }) as any as Schema.Schema<Pools>;

export interface Lodging {
  /** Conveniences provided in guest units to facilitate an easier, more comfortable stay. */
  housekeeping?: Housekeeping;
  /** Conveniences or help provided by the property to facilitate an easier, more comfortable stay. */
  services?: Services;
  /** General factual information about the property's physical structure and important dates. */
  property?: Property;
  /** Parking options at the property. */
  parking?: Parking;
  /** Property rules that impact guests. */
  policies?: Policies;
  /** Physical adaptations made to the property in consideration of varying levels of human physical ability. */
  accessibility?: Accessibility;
  /** Output only. All units on the property have at least these attributes. */
  allUnits?: GuestUnitFeatures;
  /** Policies regarding guest-owned animals. */
  pets?: Pets;
  /** Guest facilities at the property to promote or maintain health, beauty, and fitness. */
  wellness?: Wellness;
  /** Meals, snacks, and beverages available at the property. */
  foodAndDrink?: FoodAndDrink;
  /** Amenities and features related to leisure and play. */
  activities?: Activities;
  /** Services and amenities for families and young guests. */
  families?: Families;
  /** Features of the property of specific interest to the business traveler. */
  business?: Business;
  /** Output only. Some units on the property have as much as these attributes. */
  someUnits?: GuestUnitFeatures;
  /** Health and safety measures implemented by the hotel during COVID-19. */
  healthAndSafety?: HealthAndSafety;
  /** Sustainability practices implemented at the hotel. */
  sustainability?: Sustainability;
  /** Individual GuestUnitTypes that are available in this Lodging. */
  guestUnits?: Array<GuestUnitType>;
  /** Vehicles or vehicular services facilitated or owned by the property. */
  transportation?: Transportation;
  /** The ways in which the property provides guests with the ability to access the internet. */
  connectivity?: Connectivity;
  /** Required. Google identifier for this location in the form: `locations/{location_id}/lodging` */
  name?: string;
  /** Required. Metadata for the lodging. */
  metadata?: LodgingMetadata;
  /** Swimming pool or recreational water facilities available at the hotel. */
  pools?: Pools;
  /** Features of the shared living areas available in this Lodging. */
  commonLivingArea?: LivingArea;
}

export const Lodging: Schema.Schema<Lodging> = Schema.suspend(() => Schema.Struct({
  housekeeping: Schema.optional(Housekeeping),
  services: Schema.optional(Services),
  property: Schema.optional(Property),
  parking: Schema.optional(Parking),
  policies: Schema.optional(Policies),
  accessibility: Schema.optional(Accessibility),
  allUnits: Schema.optional(GuestUnitFeatures),
  pets: Schema.optional(Pets),
  wellness: Schema.optional(Wellness),
  foodAndDrink: Schema.optional(FoodAndDrink),
  activities: Schema.optional(Activities),
  families: Schema.optional(Families),
  business: Schema.optional(Business),
  someUnits: Schema.optional(GuestUnitFeatures),
  healthAndSafety: Schema.optional(HealthAndSafety),
  sustainability: Schema.optional(Sustainability),
  guestUnits: Schema.optional(Schema.Array(GuestUnitType)),
  transportation: Schema.optional(Transportation),
  connectivity: Schema.optional(Connectivity),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(LodgingMetadata),
  pools: Schema.optional(Pools),
  commonLivingArea: Schema.optional(LivingArea),
})).annotate({ identifier: "Lodging" }) as any as Schema.Schema<Lodging>;

export interface GetGoogleUpdatedLodgingResponse {
  /** Required. The Google updated Lodging. */
  lodging?: Lodging;
  /** Required. The fields in the Lodging that have been updated by Google. Repeated field items are not individually specified. */
  diffMask?: string;
}

export const GetGoogleUpdatedLodgingResponse: Schema.Schema<GetGoogleUpdatedLodgingResponse> = Schema.suspend(() => Schema.Struct({
  lodging: Schema.optional(Lodging),
  diffMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GetGoogleUpdatedLodgingResponse" }) as any as Schema.Schema<GetGoogleUpdatedLodgingResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetLodgingLocationsRequest {
  /** Required. Google identifier for this location in the form: `locations/{location_id}/lodging` */
  name: string;
  /** Required. The specific fields to return. Use "*" to include all fields. Repeated field items cannot be individually specified. */
  readMask?: string;
}

export const GetLodgingLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/lodging" }),
  svc,
) as unknown as Schema.Schema<GetLodgingLocationsRequest>;

export type GetLodgingLocationsResponse = Lodging;
export const GetLodgingLocationsResponse = Lodging;

export type GetLodgingLocationsError = CommonErrors;

/** Returns the Lodging of a specific location. */
export const getLodgingLocations: API.OperationMethod<GetLodgingLocationsRequest, GetLodgingLocationsResponse, GetLodgingLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetLodgingLocationsRequest,
  output: GetLodgingLocationsResponse,
  errors: [],
}));

export interface UpdateLodgingLocationsRequest {
  /** Required. Google identifier for this location in the form: `locations/{location_id}/lodging` */
  name: string;
  /** Required. The specific fields to update. Use "*" to update all fields, which may include unsetting empty fields in the request. Repeated field items cannot be individually updated. */
  updateMask?: string;
  /** Request body */
  body?: Lodging;
}

export const UpdateLodgingLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Lodging).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/locations/{locationsId}/lodging", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateLodgingLocationsRequest>;

export type UpdateLodgingLocationsResponse = Lodging;
export const UpdateLodgingLocationsResponse = Lodging;

export type UpdateLodgingLocationsError = CommonErrors;

/** Updates the Lodging of a specific location. */
export const updateLodgingLocations: API.OperationMethod<UpdateLodgingLocationsRequest, UpdateLodgingLocationsResponse, UpdateLodgingLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateLodgingLocationsRequest,
  output: UpdateLodgingLocationsResponse,
  errors: [],
}));

export interface GetGoogleUpdatedLocationsLodgingRequest {
  /** Required. Google identifier for this location in the form: `locations/{location_id}/lodging` */
  name: string;
  /** Required. The specific fields to return. Use "*" to include all fields. Repeated field items cannot be individually specified. */
  readMask?: string;
}

export const GetGoogleUpdatedLocationsLodgingRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/lodging:getGoogleUpdated" }),
  svc,
) as unknown as Schema.Schema<GetGoogleUpdatedLocationsLodgingRequest>;

export type GetGoogleUpdatedLocationsLodgingResponse = GetGoogleUpdatedLodgingResponse;
export const GetGoogleUpdatedLocationsLodgingResponse = GetGoogleUpdatedLodgingResponse;

export type GetGoogleUpdatedLocationsLodgingError = CommonErrors;

/** Returns the Google updated Lodging of a specific location. */
export const getGoogleUpdatedLocationsLodging: API.OperationMethod<GetGoogleUpdatedLocationsLodgingRequest, GetGoogleUpdatedLocationsLodgingResponse, GetGoogleUpdatedLocationsLodgingError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGoogleUpdatedLocationsLodgingRequest,
  output: GetGoogleUpdatedLocationsLodgingResponse,
  errors: [],
}));

