---
layout: default
title: "How to Analyze the Strength of the Scientific Evidence?"
date: 2026-10-31
summary: 
---

## Analyzing the strength of the scientific evidence

What does research paper trying to convey?

I think most papers are composed of three parts, as follows:

1. Problems (Engineering) & Questions (Science) → **Motivation** (Why did they do it?)
2. Hypothesis → Methods & Expected Outcomes → **Experimental Design** (How did they approach the challenge?)
3. Results → Claims & Limitations → **Insights** (What do we need to learn from them?)

When reading a paper, one can use two "lenses." The **first lens** is to understand the field. Understanding a research field means knowing which questions are worth exploring, what some common challenges are, and what kinds of methods and experimental tools people use to tackle those challenges. This is important because, to design new experiments and develop my own hypotheses, I need to know what has already been done. There is an old proverb: "Don't go to the forest to invent the best-designed pen; just go to the market and see what has already been designed."

But the **second lens** is about analyzing the "strength of the evidence." The questions the authors ask may be great and important, and their proposed methods can be phenomenal. Yet, if the evidence supporting their claims is not strong enough, we cannot trust the conclusions and insights they draw from the experiment. This is often hard to figure out intuitively just by reading a paper, because such weaknesses may not be explicitly mentioned in the limitations, or people may overlook alternative explanations or variables.

I think understanding this second lens in a strong, structured way would enable a sharp distinction between evidence and claims in a paper-agnostic manner that could be useful across many domains.

So, I want to focus on a logical framework to evaluate **how strongly scientific evidence supports a given claim.**

(Most of my examples will be related to brain-AI, but the same logical layers can be applied to any domain.)

Authors may present "one or several of the types of evidence" below to support their claims or hypotheses. Understanding what we can and cannot claim at each level is very important for asking whether the given evidence is strong enough to support a claim. These levels of scientific evidence can help us identify counterexamples or missing circuitry, revisit experimental designs and results to find what we might have missed, understand why some experiments fail or succeed, and enhance such claims.

**Levels of scientific evidence (Weak $\rightarrow$ Strong)**

1. Definition & Inductive Bias
2. Correlation
3. Prediction (Pattern Recognition)
4. Causal Perturbation
5. Model-driven Causal Perturbation (System Identification)
6. Identifying the Underlying Mechanism

## 1. Definition & Inductive bias

Before designing experiments to support a claim, we first need to answer: What do we want to claim? This is what I call **Definition**. A definition includes:

- What exactly are we measuring?
- What kinds of computations does the brain perform? e.g., the brain seems to perform: 
	- Prediction: The brain is a universal function approximator that finds relationships between observations over time to predict future events.
	- Error computation: The brain calculates errors related to objectives and expectations.
	- Filtering: The brain amplifies attended signals or filters out noise (e.g., the cocktail party problem).
	- Evidence integration & memory: The brain accumulates and stores information over time.
	- Action selection: The brain selects actions based on current information and controls actuators.
	- Reuse and maintenance: The brain develops, maintains, and updates useful representations and encodings.

**Inductive bias:** When we use a model or statistical test to understand data, the model itself may have a bias toward certain results. This is called inductive bias. For example, when we use GPFA (Gaussian process factor analysis), since the model is built to enforce the "smoothness" of state trajectories, this does not mean the neural state itself is inherently smooth. When we use linear regression, we assume there is a linear relationship between input and output features. We can conclude:

> Strength of evidence = Data structure + Model inductive bias

## 2. Correlation

Correlation measures statistical association (typically linear association when using Pearson correlation).

However, correlation does not establish **causal direction**.

Let's consider the counterexamples below. If A and B are correlated, all three cases are possible. This means that different causal structures can produce an association between A and B. Therefore, we need a stronger perturbation experiment to identify whether A causally affects B, which we will discuss in **Section 4.**

$$
\begin{array}{ccc}
\text{Direct} & \text{Reverse} & \text{Common Cause}\\[10pt]
A \longrightarrow B &
A \longleftarrow B &
\begin{array}{ccc}
& C &\\
\swarrow && \searrow\\
A && B
\end{array}
\end{array}
$$

## 3. Prediction (Pattern Recognition)

I think correlations are relatively simple, intuitive relationships we can find (e.g., linear or inverse relationships), but prediction can involve less intuitive, nonlinear pattern recognition. The brain also does this. Why? Because prediction can be useful for animals. Predicting future events allows us to prepare actions and improve survival.

However:

- Good prediction does not necessarily mean understanding the underlying mechanism.
- A predicting B does not mean A **causally** drives B.
- A hidden variable C may drive both A and B.

To test whether our predictions are good, we must evaluate them on held-out data, preferably including out-of-distribution conditions.

In prediction, baselines matter.

**Why baseline matters?**

Suppose we want to predict $B_{t+1}$ using $A_t$.

But if $B_t$ is already highly predictive of $B_{t+1}$, good performance may simply reflect temporal autocorrelation.

We should compare:

$\text{Baseline: }\hat B_{t+1}=f(B_t)$

$\text{Full model: }\hat B_{t+1}=g(A_t,B_t)$

and important thing to evaluate is the "gain" between the two model.

$$
\Delta R^2 = R^2_{\text{full}} - R^2_{\text{baseline}}
$$

The new feature A is only valuable when this new feature A actually improve prediction beyond what is already predictable from B. Good prediction is insufficient when baseline is already strong.

## 4. Causal Perturbation

Prediction asks: Can A predict B?

Causal perturbation asks: If we actively change A, does B change? This can help elucidate the three DAG cases above (in Section 2 on correlation).

The average causal effect for a binary intervention is:

$\mathrm{\text{Casual effect of binary perturbation}} = \mathbb E[B\mid do(A=1)] - \mathbb E[B\mid do(A=0)]$

Different causal structures can produce similar observational correlations but different responses to intervention. What kind of causal structure is possible?

**Case 1: Common input**

$$
\begin{array}{ccc}
& C &\\
\swarrow && \searrow\\
A && B
\end{array}
$$

If we intervene on A, B need not change because B is driven by C, assuming no other causal pathway from A to B. 

**Case 2: Direct influence**

$$
A \longrightarrow B
$$

Perturbing A can change B, if the intervention is effective and the causal effect is expressed under the tested conditions.

**Case 3: Indirect influence**

$$
A \longrightarrow C \longrightarrow B
$$

Perturbing A may change B through C. The magnitude of the effect can depend on other inputs, hidden variables, and the current state. 

**Case 4: Multiple or compensatory pathways**

$$
\begin{aligned}
A &\longrightarrow C_1 \longrightarrow B\\
A &\longrightarrow C_2 \longrightarrow B \\
A &\longrightarrow B \ and \ A' \longrightarrow B
\end{aligned}
$$

Different pathways may produce opposing effects or compensation. Therefore, a small or null effect (e.g., no change after perturbation experiment) does not necessarily imply that A has no causal role. Because, intuitively, it may be due to lack of A's energy to make causal effect to B, or other inhibitory circuits may reduce the causal effect of A.

**Important limitation:** Causal perturbation identifies the effect of an intervention, but does not necessarily identify a unique mechanism or detailed generating principles.

For example, observing $do(A)$ to $\Delta B$ may not distinguish **case 2** and **case 3**:

$A\to B \qquad\text{vs.}\qquad A\to C\to B$

In this case we might need additional experiments targeting C (e.g., by inhibition), pathway-specific measurements, or selective interventions to distinguish them.

## 5. Model-driven Causal Perturbation (System Identification)

Instead of only asking whether perturbing A changes B, we want to understand how an **external input** changes the system under different **internal states or contexts.**

A general dynamical model is:

$z_{t+1}=f_\theta(z_t,u_t)$

where:
- $z_t$: current neural state
- $u_t$: external input or stimulation
- $f_\theta$: state-transition dynamics

Natural dynamics without external input may be very different from responses under stimulation. In the brain's case is more complicated because there will be always an existing "unknown input" from different feedback, feedforward neural pathways. The system identification can be thought as in linear dynamical model case: $\dot x = Ax+Bu$ , identifying, A and B. 


Therefore, we need observations of many stimulus-response mappings:

$(z_t,u_t)\longrightarrow z_{t+1}$

under sufficiently diverse inputs and states.

A possible experiment is to identify a model of neural population dynamics and use it to predict the effects of stimulation along or away from specific neural manifold directions, potentially using local linearization. We can then apply the designed perturbations and test whether the resulting neural trajectories and behavior change as predicted.

$\delta\dot{x}=A\delta x+B\delta u$ 

$$
\underbrace{\text{Identify } A,B}_{\text{Model}}
\;\longrightarrow\;
\underbrace{\text{Predict response to }u}_{\text{Hypothesis}}
\;\longrightarrow\;
\underbrace{\text{Apply stimulation}}_{\text{Intervention}}
\;\longrightarrow\;
\underbrace{\text{Compare predictions}}_{\text{Evidence}}
$$

However, this tests an intervention-aware dynamical hypothesis, not necessarily the **unique**  mechanism of the biological computation. 

Yet, I think it is worth noting that identifying such a causal, state-aware dynamical model under the relevant intervention conditions could be "**sufficient**" for designing a clinically useful closed-loop control system. This is because we do not need an exact model that follows the unique mechanism of internal biological computation to drive the brain toward a desired state.

> Complete mechanistic understanding is **not a necessary condition** for clinical relevance and application. Still, we need a model that knows what to predict and control: Given the current neural state $x$, predict how stimulation $u$ affects natural neural dynamics and determine the optimal $u$ to reach a desired target $y$ effectively.

**Identifiability problem:** Even perfect system identification of stimulation responses $u(t)\rightarrow y(t)$ does not **uniquely** identify the underlying neural mechanism.

Simply put, for any invertible transformation $z=T^{-1}x$, the equivalent model $\dot z=T^{-1}ATz+T^{-1}Bu,\; y=CTz$ produces identical input–output behavior despite having different internal state-space representations.

## 6. Identifying the Unique Underlying Mechanism

Even successful interventional predictions may be compatible with multiple causal mechanisms.

To identify a **unique** mechanistic claim, we might need:

1. **Discriminating perturbations:** Design interventions that produce different predictions across competing mechanistic hypotheses, allowing us to rule out inconsistent models.
2. **Testing alternative models:** Test whether simpler or fundamentally different models explain the same findings. If not, then the model may be unique.
3. **Generalization:** Test across states, tasks, subjects, and intervention conditions.
4. **Biological plausibility:** Examine whether the proposed mechanism agrees with independent physiological and anatomical evidence. E.g., the brain **cannot** do backpropagation.

---
**Takeaway:**

Analyzing the strength of Evidence-Claim:

- **Observation:** What statistical relationships exist?
- **Prediction:** Does the model predict new data beyond appropriate baselines?
- **Causal perturbation:** Does changing a variable cause a causal effect?
- **System identification:** Can we model the state-dependent input–output dynamics?
- **Sufficient Condition to Control:** Can we use the model to reliably drive the system toward desired neural states or behaviors?
- **Unique mechanism:** Does the model capture how the brain actually performs computation?