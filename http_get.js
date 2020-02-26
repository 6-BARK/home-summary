import http from "k6/http";
import { check, sleep } from "k6";

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export let options = {
  vus: 100,
  duration: "60s"
}

export default function() {
  let random = getRandomNumber(1, 10000001);
  let res = http.get(`http://localhost:3000/api/listing/${random}/data`);
  check(res, {
    "status was okay": (r) => r.status === 200,
    "transaction time OK": (r) => r.timings.duration < 2000,
    "failed": (r) => r.status === 500
  });
}