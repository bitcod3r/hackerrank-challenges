# hackerrank-challenges
Algorithm solution to HackerRank challenges.

## Excersice #1
Return the user ids that reach the threshold of transactions contained in a log file. 
Each line of the log file is composed by:

_sender_user_id_ [space] _recipient_user_id_  [space] _amount_of_transaction_ 


```
99 88 200
88 99 100
99 32 500
12 12 100  
```

In the last example. the transaction count for each user, regardless of the role are

```
ID  Transactions
--  ------------
99  3
88  2
12  1
32  1
```

There are two users with at least threshold = 2 transactions: 99 and 88. In ascending order, the return array is ['88', '99'].

**Note:** In the last entry, user 12 was on both sides of the transaction. This counts as only 1 transaction for user 12.

### Function Description
Complete the function processLogin, it has the following parameter(s):
  
  `string logs[n]`: each logs[i] denotes the ith entry in the logs.

  `int threshold`: the minimum number of transactions that a user must have to be included in the result.

### Returns

  `string[]`: an array of user ids as strings, sorted ascending by numeric value.

### Constraints

- 1 <= n <= 10^5
- 1 <=  threshold <= n
- The _sender_user_id_, _recipient_user_id_ and _amount_of_transaction_ contain only characters in the range ascii['0-9']
- The _sender_user_id_, _recipient_user_id_ and _amount_of_transaction_ start with a non-zero digit.
- 0 < length of The _sender_user_id_, _recipient_user_id_ and _amount_of_transaction_  <= 9
- The result will contain at least one element.

