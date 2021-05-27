In order to understand the working of looping constructs, it is important to understand the term block. A group of code statements that are associated and intended to be executed as a unit is referred to as a block. In C, the beginning of a block of code is denoted by writing a set of statements with in curly braces. It is not necessary to place a semicolon after the end of a block. Blocks can be left empty. A block and can be written inside another block of statements, in such a case the former block is said to be nesting inside the other block.

A loop is a construct that instructs the computer to repeatedly execute a certain block of code until a certain condition is met or for a certain fixed number of times. Every such repetition is called an iteration. Break statement can be used to exit a looping construct and a Continue statement can used to start another iteration at any point. A looping construct typically has three sections:

1. An Initialization part where variables are initialized before looping is started. These are executed only once.
2. A Test expression which determines when to exit the looping construct.
3. An update section where variables are updated before the next iteration of the loop.

The following are the most commonly used looping constructs used in C programming:

#### For loop
In a for loop, the initialization, test expression and update expressions sections are written together in a single line :

```
	for(initialization; test expression; update statements) {
				statements1;
				}
```

This improves the readability of the construct. The initialization expression is executed only once and is immediately followed by checking of the test expression. Hence, it is an entry controlled loop. If the test expression is false, then the construct is exited. So, it is possible that the statements1 may not get executed even once. If the test expression is true then statements1 are executed and it is followed by the execution of the update statements. Now, the test expression is evaluted again to check whether the loop should be exited. If not, the whole process is repeated, starting from the execution of statements1.

The sequence of execution of statements is:

1. Initialization
2. Test Expression
3. Block Statements
4. Update statements
5. Test Expression
6. ...

Everytime when the test expression is evaluated, if it becomes false, then the loop is exited. This image shows the steps taken for this.

<img src="flowchart_for.jpg">


#### While loop

While loop is another entry controlled loop. It works in a similar way as a for loop the only difference is that the initialization statements, test expression and the update statements are not written together. In fact, the update statements are written along with the block statements. The looping is terminated only when the test expression becomes false.

```
			initialization;
			while(test expression){
				    statements1;
				    update statements;
				}
```

The sequence of execution of statements is:

1. Initialization
2. Test Expression
3. Block Statements
4. Update statements
5. Test Expression
6. ...

Everytime when the test expression is evaluated, if it becomes false, then the loop is exited.



#### Do-while loop

The the block statements in the for and while loops may not get executed at all because the test condition is checked before the execution. The Do-while loops ensure that the block statements are executed at least once, because in this the test expression is checked after doing one execution of the loop body. As usual the update statements come before the test condition loop. The following is the syntax of Do-while loops: 

```
			do{
			        statements1;
			        update statements;
			}while(test expression);
```

The sequence of execution of statements is:

1. Initialization
2. Block Statements
3. Update statements
4. Test Expression
5. Block Statements
6. Update statements
7. Test Expression
8. ...

Everytime when the test expression is evaluated, if it becomes false, then the loop is exited.



**Important:**


1. Any loop can be exited at anytime by using a break statement.
2. Next iteration of the loop can be started at anypoint by using the continue statement.


