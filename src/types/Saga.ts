import { AnyAction } from "redux";
import { CallEffect, PutEffect } from "redux-saga/effects";

export type SagaGeneratorType<T> = Generator<CallEffect<T> | PutEffect<AnyAction>, void, T>