import { writable } from 'svelte/store';

export const pointer = writable({ x: 0, y: 0 });
export const prevPointer = writable({ x:0, y:0 });