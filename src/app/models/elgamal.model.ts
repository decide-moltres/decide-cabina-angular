const BigInt = require('jsbn').BigInteger;
import * as sjcl from "sjcl";

export class ElGamal {
  constructor() { }

  static BITS = 256;

  static getRandomInteger = (max: any) => {
    const bitLength = max.bitLength();
    const random = sjcl.random.randomWords(bitLength, 0);
    const randBi = new BigInt(sjcl.codec.hex.fromBits(random), 16);
    return randBi.mod(max);
    return BigInt._from_java_object(random).mod(max);
  }

  static encrypt = (pk: any, m: any, r?: any) => {
    if (m.equals(BigInt.ZERO)) {
      throw new Error('Can\'t encrypt 0 with El Gamal');
    }

    if (!r) {
      const q = BigInt.fromInt(2).pow(ElGamal.BITS);
      const q1 = q.subtract(BigInt.ONE);
      r = ElGamal.getRandomInteger(q1);
    }

    const alpha = pk.g.modPow(r, pk.p);
    const beta = (pk.y.modPow(r, pk.p)).multiply(m).mod(pk.p);

    return { alpha, beta };
  }
}
