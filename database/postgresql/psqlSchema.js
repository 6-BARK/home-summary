
CREATE TABLE "HouseData" (
	"houseId" serial NOT NULL,
	"price" integer NOT NULL,
	"bedCount" smallint NOT NULL,
	"bathCount" smallint NOT NULL,
	"address" varchar(50) NOT NULL,
	"sqft" integer NOT NULL,
	"listingType" varchar(50) NOT NULL,
	"zestimate" integer NOT NULL,
	"estPayment" integer NOT NULL,
	"primaryAgent" integer NOT NULL,
	CONSTRAINT "HouseData_pk" PRIMARY KEY ("houseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Agents" (
	"agentId" serial NOT NULL,
	"agentName" varchar(50) NOT NULL,
	"agentType" varchar(50) NOT NULL,
	"starCount" smallint NOT NULL,
	"reviewCount" smallint NOT NULL,
	"phoneNumber" varchar(15) NOT NULL,
	CONSTRAINT "Agents_pk" PRIMARY KEY ("agentId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "ContactAgent" (
	"requestId" serial NOT NULL,
	"agentId" integer NOT NULL,
	"houseId" integer NOT NULL,
	"customerName" varchar(50) NOT NULL,
	"customerPhone" varchar(15) NOT NULL,
	"customerMessage" varchar(250) NOT NULL,
	CONSTRAINT "ContactAgent_pk" PRIMARY KEY ("requestId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "ListingAgents" (
	"houseId" integer NOT NULL,
	"agentId" integer NOT NULL
) WITH (
  OIDS=FALSE
);


ALTER TABLE "HouseData" ADD CONSTRAINT "HouseData_fk0" FOREIGN KEY ("primaryAgent") REFERENCES "Agents"("agentId");

ALTER TABLE "ContactAgent" ADD CONSTRAINT "ContactAgent_fk0" FOREIGN KEY ("agentId") REFERENCES "Agents"("agentId");
ALTER TABLE "ContactAgent" ADD CONSTRAINT "ContactAgent_fk1" FOREIGN KEY ("houseId") REFERENCES "HouseData"("houseId");

ALTER TABLE "ListingAgents" ADD CONSTRAINT "ListingAgents_fk0" FOREIGN KEY ("houseId") REFERENCES "HouseData"("houseId");
ALTER TABLE "ListingAgents" ADD CONSTRAINT "ListingAgents_fk1" FOREIGN KEY ("agentId") REFERENCES "Agents"("agentId");

