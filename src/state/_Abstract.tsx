import { Dispatch, SetStateAction } from "react";


export abstract class AbstractState<T> {
    state: T;
    setState: Dispatch<SetStateAction<T>>;

    constructor([state, setState]: [T, Dispatch<SetStateAction<T>>]) {
        this.state = state;
        this.setState = setState;
    }
}