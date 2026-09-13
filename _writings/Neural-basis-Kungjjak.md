---
layout: default
title: "Neural Basis of \"Kungjjak\""
date: 2026-08-15
summary: ""
---

## Neural Basis of "Kungjjak"

We sometimes meet someone and feel strangely comfortable around them. They understand what we mean without much explanation, and sometimes even predict what we are about to say. With other people, even a simple idea takes long explanations and repeated clarification.

In Korean, we call this **"kungjjak (쿵짝)"**; roughly meaning that two people "click," fit well, or somehow resonate with each other.

I was wondering if we could think about this feeling from a computational perspective.

When we think or talk, our minds probably do not contain isolated words or concepts. Experiences, emotions, memories, and concepts may instead be represented as high-dimensional neural representations (e.g., recorded from many channels of neural hardware; $\in R^n$) that continuously change over time. There is also substantial scientific evidence that these high-dimensional neural activities may have underlying low-dimensional latent neural representations, where $R^d \ll R^n$ [1,2].

So maybe a thought is better described not as a single point in latent space, but as a **trajectory moving through latent space**.

And maybe kungjjak is not simply about having similar states right now. More interestingly, our thoughts may tend to diffuse and spread toward similar future states; we may have similar **predictive dynamical trajectories**.

### Shared Latent Space

Everyone has different experiences, language, memories, cultures, and ways of thinking, so our internal latent spaces cannot be exactly the same.

But when two people spend enough time together, or share similar experiences and ways of thinking, some parts of their internal representations may become aligned. Conceptually, we can call this a **shared latent space**. Even though the orthogonal basis of each representation may be different, the relationships and transformations during the dynamics could still be similar (Recall $ \dot x = Ax+Bu \sim \dot x= T^{-1}ATx+T^{-1}B$).

What is interesting is that shared representation may reduce how much information we actually need to communicate.

Let my internal state be $Z_A$, and the other person's internal state be $Z_B$.

If the other person cannot predict my thought at all, I need to encode a lot of $Z_A$ into language. I need to explain the background, context, assumptions, and why I reached the conclusion.

But if we already share a lot of representation, their internal model can fill in what I did not explicitly say.

Information-theoretically, what matters may therefore not simply be $H(Z_A)$, but the uncertainty remaining after conditioning on what the other person already knows: $H(Z_A \mid Z_B)$.

If our internal representations are well aligned, $H(Z_A \mid Z_B) \downarrow$ , and therefore the amount of information I need to explicitly communicate also decreases.

In this sense, $I(Z_A; Z_B)=H(Z_A)-H(Z_A\mid Z_B)$ roughly describes how much knowing one person's state reduces uncertainty about the other's.

This is conceptually related to **predictive information**, discussed by Bialek, Nemenman, and Tishby in *Predictability, Complexity, and Learning* [3]. Their idea focuses on how much information the past contains about the future: $I_{\text{pred}}=I(Z_{\text{past}};Z_{\text{future}})$.

For kungjjak, the interesting idea is similar: maybe one person's current state contains unusually high information about the **future trajectory** of the other person's thought.

So "we understand each other without saying much" may actually be a kind of **communication subspace compression**.

People with good kungjjak are not necessarily people who think exactly the same things. They may simply require less additional information to reconstruct and predict each other's thoughts.

### Kungjjak as Predictive Nominal Trajectory

But shared latent states alone may not be enough.

Two people can know the exact same concepts but still arrive at completely different conclusions.

Suppose thought evolves as $z_t \rightarrow z_{t+1} \rightarrow z_{t+2} \rightarrow \cdots$.

Maybe two people with good kungjjak are not only close in latent space, but also have partially aligned **dynamics through that space**.

When one person says $A$, the other does not need every intermediate step $B$ and $C$ explained before reaching $D$.

That may be why we sometimes say:

> "I was literally thinking the same thing."

> "I know exactly what you mean."

> "That's it."

Maybe these are small moments when two latent trajectories happen to align.

So I would define **kungjjak** not simply as how similarly two people think, but as:

**how well two people can predict and reconstruct each other's internal states and future trajectories with minimal additional information.**

### Why Does It Feel Comfortable?

Communication itself has a cost (i.e., social battery)

To communicate one thought, I need to translate my internal representation into language, choose words, observe the other person's response and small facial expressions, avoid and detect misunderstanding, explain again, and decode their response back into my own words.

Very abstractly, we can say: $C \approx C_{\text{encoding}} + C_{\text{transmission}} + C_{\text{inference}} + C_{\text{correction}}$.

This is not only subjective cognitive effort but also includes the sensorimotor efforts like auditory and articulatory movements. Underneath it are neural computation and signaling, which also consume metabolic energy.

If two people have a large shared latent space and predictive dynamics, at least some of these costs may decrease.

Sometimes,

> "You know that feeling from that time?"

is enough to reconstruct an entire experience.

With someone else, communicating the same internal state may take twenty sentences.

So maybe part of the comfort we feel around certain people is that we do not constantly need to **translate, encode, explain, and correct ourselves**.

In short, my hypothesis is:

$\text{Shared Representation} \uparrow$

$\Rightarrow H(Z_A \mid Z_B) \downarrow$

$\Rightarrow \text{Required Communication} \downarrow$

$\Rightarrow \text{Cognitive Effort} \downarrow$

$\Rightarrow \text{Neural / Metabolic Cost}; ? \downarrow$

$\Rightarrow \text{Subjective Comfort} \uparrow$

I intentionally put a question mark next to metabolic cost.

Reduced uncertainty and reduced communication seem fairly intuitive, but saying that shared representation between two people literally decreases total brain metabolic consumption is much stronger. That would be a **prediction to test**, not something we can assume.

Still, this gives an interesting way to think about why some relationships feel so effortless.

Maybe deep comfort with another person is not exactly:

> "This person is the same as me."

Maybe it is closer to:

> **"I don't need to fully encode myself around this person."**

---

**References**

**[1]** Churchland, M. M., Cunningham, J. P., Kaufman, M. T., et al. (2012). Neural population dynamics during reaching. Nature, 487, 51–56. doi:10.1038/nature11129.

**[2]** Cunningham, J. P., & Yu, B. M. (2014). Dimensionality reduction for large-scale neural recordings. Nature Neuroscience, 17, 1500–1509. doi:10.1038/nn.3776.

**[3]** Bialek, W., Nemenman, I., & Tishby, N. (2001). Predictability, complexity, and learning. Neural Computation, 13(11), 2409–2463. doi:10.1162/089976601753195969.