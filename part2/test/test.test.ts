import { describe, expect, test } from '@jest/globals'
import {
    delayedSum, Post, postsUrl, postUrl, invalidUrl, fetchData, fetchMultipleUrls, isPost, isPostArray
} from '../src/part2';

const fail = (message :string) => {throw new Error(message)}

jest.setTimeout(100000000) // this is to allow debugging

describe('Assignment 4 Part 2', () => {
    describe('Q2.1 delayedSum (6 points)', () => {
        test('delayedSum returns the sum', async () => {
            let a = 2, b = 4, delay = 10
            await delayedSum(a,b,delay)
                    .then((result : number) => expect(result).toBe(a+b))
                    .catch((error: string) => fail(error))
        })
        test('delayedSum waits at least the specified delay', async () =>  {
            let a = 2, b = 4, delay = 200
            const time: number = Date.now()
            await delayedSum(a,b,delay)
                    .then(() => expect((Date.now() - time) >= delay).toBeTruthy())
                    .catch((error: string) => fail(error))
        })
    })

    describe('Q2.2 fetchData (12 points)', () => {
        test('successful call to fetchData with array result', async () => {
            await fetchData(postsUrl).then((returned : Post | Post[]) => {
                if(isPostArray(returned)){
                    expect(returned.length).toBe(100)
                } else {
                    fail("expected Post[] but got Post")
                }             
            }).catch(error => fail(error))
        })

        test('successful call to fetchData with Post result', async () => {
            const id = 5
            await fetchData(postUrl+id).then((returned : Post | Post[]) => {
                isPost(returned) ? expect(returned.id).toBe(id) :
                fail("expected Post but got Post[]")
            })
        })

        test('failed call to fechData', async () => {
            await fetchData(invalidUrl).then(() => {
                fail("expected reject but got resolve")
            }).catch((error) => {});
        })

    })

    describe('Q2.3 fetchMultipleUrls (12 points)', () => {
        test('successful call to fetchMultipleUrls', async () => {
            let urls : string[] = Array()
            for(let i = 1; i <=20 ; i++){
                urls.push(postUrl+i)
            }
            await fetchMultipleUrls(urls)
                    .then((posts: Post[]) =>{
                        if(posts.length != 20){
                            fail("fetch multiple urls fail because length != 20")
                        }
                    }).catch((error)=>fail("fetch multiple urls fail with error: "+error))
        })

        test('successful call to fetchMultipleUrls: verify results are in the expected order ', async () => {
            let urls : string[] = Array()
            for(let i = 1; i <=20 ; i++){
                urls.push(postUrl+i)
            }
            await fetchMultipleUrls(urls)
                    .then((posts: Post[]) =>{
                        if(posts.length === 20){
                            let i = 1
                            posts.forEach((post:Post) => {
                                if(post.id != i++) {
                                    fail("fetch multiple urls fail because id != i")
                                }
                            })
                        } else {
                            fail("fetch multiple urls fail because length != 20")
                        }
                    }).catch((error)=>fail("fetch multiple urls fail with error: "+error))
        })

        test('failed call to fetchMultipleUrls', async () => {
            let urls : string[] = Array()
            for(let i = 1; i <=20 ; i++){
                urls.push(invalidUrl+i)
            }
            await fetchMultipleUrls(urls)
                    .then((posts: Post[]) => fail("expected rejected but got resolved"))
                    .catch((error)=>{})
        })

    })
});

