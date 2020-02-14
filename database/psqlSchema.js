

CREATE TABLE "Agents"
(
 "agentId"     integer NOT NULL,
 "agentName"   varchar(50) NOT NULL,
 "agentType"   varchar(50) NOT NULL,
 "starCount"   smallint NOT NULL,
 "reviewCount" smallint NOT NULL,
 "phoneNumber" varchar(15) NOT NULL,
 CONSTRAINT "PK_Agent List" PRIMARY KEY ( "agentId" )
);

CREATE TABLE "Contact Agent"
(
 "requestId"       integer NOT NULL,
 "customerName"    varchar(50) NOT NULL,
 "customerPhone"   varchar(15) NOT NULL,
 "customerMessage" varchar(100) NOT NULL,
 "agentId"         integer NOT NULL,
 CONSTRAINT "PK_Contact Agent" PRIMARY KEY ( "requestId" ),
 CONSTRAINT "FK_72" FOREIGN KEY ( "agentId" ) REFERENCES "Agents" ( "agentId" )
);

CREATE INDEX "fkIdx_72" ON "Contact Agent"
(
 "agentId"
);

CREATE TABLE "House Data Summary"
(
 "houseID"     integer NOT NULL,
 "price"       integer NOT NULL,
 "bedCount"    smallint NOT NULL,
 "bathCount"   smallint NOT NULL,
 "address"     text NOT NULL,
 "listingType" text NOT NULL,
 "zestimate"   integer NOT NULL,
 "estPayment"  integer NOT NULL,
 CONSTRAINT "PK_House Data Summary" PRIMARY KEY ( "houseID" )
);














