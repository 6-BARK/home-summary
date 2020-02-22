\c xillowdb;

COPY agents
FROM '../../agents.csv' DELIMITER ',' CSV HEADER;