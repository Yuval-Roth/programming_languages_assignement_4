import { describe, expect, test } from '@jest/globals'
import {
    delayedSum, Post, postsUrl, postUrl, invalidUrl, fetchData, fetchMultipleUrls
} from '../src/part2';

describe('Assignment 4 Part 2', () => {
    describe('Q2.1 delayedSum (6 points)', () => {
        test('delayedSum returns the sum', async () => {
            let a = 2, b = 4, delay = 10
            await delayedSum(a,b,delay)
                    .then((result : number) => expect(result === 6).toBeTruthy())
                    .catch((error : string) => expect(false).toBeTruthy())
        })
        test('delayedSum waits at least the specified delay', async () =>  {
            let a = 2, b = 4, delay = 200
            const time: number = Date.now()
            await delayedSum(a,b,delay)
                    .then((result : number) => expect((Date.now() - time) >= delay).toBeTruthy())
                    .catch((error : string) => expect(false).toBeTruthy())
        })
    })

    describe('Q2.2 fetchData (12 points)', () => {
        test('successful call to fetchData with array result', async () => {
            // fetchData(postsUrl)
            //.then((returned: Post | Post[]) => {
            
            //})
        })

        test('successful call to fetchData with Post result', async () => {
        })

        test('failed call to fechData', async () => {
        })

    })

    describe('Q2.3 fetchMultipleUrls (12 points)', () => {
        test('successful call to fetchMultipleUrls', async () => {
        })

        test('successful call to fetchMultipleUrls: verify results are in the expected order ', async () => {
        })

        test('failed call to fetchMultipleUrls', async () => {
        })

    })
});

