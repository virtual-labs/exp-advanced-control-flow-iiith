This simulation allows you to explore two main experiments:

1. **Factorial Calculation using Loops**
2. **Pyramid Pattern using Nested Loops**

You can switch between these two modes at any time using the **Switch to Nested Loop** or **Switch to Simple Loop** button. Each experiment can be performed in two ways:

- Start with the default mode (Simple Loop for factorial, Nested Loop for pyramid)
- Or switch to the other mode using the switch button

---

### Experiment 1: Factorial Calculation (Simple Loop)

1. By default, the simulation opens in the Simple Loop mode.
2. Select the loop type (`for`, `while`, or `do-while`) from the dropdown menu.
3. Enter the number P whose factorial you want to calculate. P must be a whole number from **0 to 12**, because 13! is too large to store in a C `int`.
4. Click **Start** to begin the simulation.
5. The code for the selected loop will be displayed, and the **Next** button will be enabled.
6. Click **Next** repeatedly to execute the code step by step. The line shown in red is the line that has just been executed, and the local variables `p`, `i` and `fact` show their values after that line. A short note below the variables explains the step, e.g. `check i>=1 → 0>=1 is false`.
7. The working of each multiplication (e.g. `fact = 1 * 3 = 3`) is listed in the output box, and the value printed by the program is shown as **Output**.
8. When the program ends, the message *Execution finished. Press Start to run again.* appears. You can then choose another loop type or value and click **Start** again.
9. To try the pyramid pattern experiment, click **Switch to Nested Loop**.

### Experiment 2: Pyramid Pattern (Nested Loop)

1. Click **Switch to Nested Loop** to open the nested loop simulation (or start here if already in this mode).
2. Enter the height of the pyramid, a whole number from **1 to 7**.
3. Click **Start** to begin the simulation.
4. The code for the nested loop will be displayed, and the **Next** button will be enabled.
5. Click **Next** repeatedly to execute the code step by step. The line shown in red is the line that has just been executed, the local variables `height`, `i`, `j` and `k` are updated, and the pyramid is drawn in the output box one character at a time. Spaces are shown as `_` so that they are visible.
6. When the program ends, the message *Execution finished. Press Start to run again.* appears.
7. To return to factorial calculation, click **Switch to Simple Loop**.

### Things to observe

- **Only executable lines are stepped through.** Lines containing only `{` or `}` are skipped, because nothing is executed there.
- **Uninitialised variables** are shown as `?` until they are given a value (for example, `p` after `int p;` and before `scanf`).
- **Loop conditions** are checked each time the loop header (`for(...)`, `while(...)`, or `}while(...);`) is highlighted. In a `do-while` loop, the body runs once before the condition is checked for the first time.
- **Scope of `i` in the `for` loop:** `i` is declared inside the `for` statement, so it exists only while the loop runs. After the loop ends, `i` is shown as *out of scope*. In the `while` and `do-while` programs, `i` is declared before the loop, so its final value (0) is still shown.
- **P = 0:** the condition `p==0` is true, so the program prints `1` and returns immediately without entering the loop.

---

**Note for Mobile Users:**

This simulation is optimized for desktop computers with larger screens and mouse interaction. If you access this experiment on a mobile device, please rotate your device to **landscape mode** for the best experience. Some features may be limited or harder to use on small screens.

### Manual

This simulation demonstrates:

- How different looping constructs (`for`, `while`, `do-while`) can be used to calculate the factorial of a non-negative integer.
- How nested loops can be used to generate a pyramid pattern of any given height.
