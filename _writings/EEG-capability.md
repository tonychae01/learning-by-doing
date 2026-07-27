---
layout: default
title: "What Can EEG Actually Do?"
date: 2026-05-10
summary: "EEG is fast, portable, and useful—but it is not telepathy. What does it really measure, and where do its promises end?"
---

## What Can EEG Actually Do?

Brain-computer interface research is often divided into two broad fields: invasive and non-invasive.

The non-invasive field includes both recording methods, such as EEG, fNIRS, MEG, and fMRI, and stimulation methods, such as tDCS, tACS, rTMS, and tFUS. Visual and auditory stimulation can also be paired with these tools to evoke measurable brain responses.

Among them, EEG is especially attractive. It has millisecond-level temporal resolution, is relatively inexpensive and portable, and can record from many points across the scalp. It is already one of the most accessible neural-recording technologies in both research and commercial products.

As a BCI researcher, however, I want to take a moment to rethink what this marketing-hyped technology can and cannot promise us. It is easy to sell EEG as a step toward telepathy. Some of that excitement reflects real progress, but some ignores the fundamental limits of what electrodes on the scalp can measure.

I am focusing here on scalp EEG, not invasive technologies such as ECoG, Neuropixels, or other implanted interfaces. Those tools involve a very different trade-off between risk and the richness of the neural activity they can probe.

- 1. EEG only measures electrical activity, not the entire neurobiology
- 2. EEG electrode lacks anatomical space
- 3. EEG has limited access to deep brain regions
- 4. EEG is a coarse brain-state estimator, not a fine-neuron decoder
- 5. EEG is highly susceptible to noise
- 6. EEG varies across people and across time
- 7. EEG is powerful when the claim matches the signal

---

### 1. EEG measures only electrical activity, not the entire neurobiology

EEG does not directly measure hormones, neurotransmitters, blood circulation, or metabolism. It measures tiny voltage differences at the scalp.

These voltages mainly arise from the summed postsynaptic currents of large populations of similarly aligned cortical neurons, especially pyramidal cells. They are not a direct recording of individual axonal action potentials. For a signal to remain visible after passing through brain tissue, cerebrospinal fluid, skull, and skin, many neurons must contribute in a sufficiently organized way.

This is why EEG tells us something important but narrow: the timing and coordination of large-scale electrical population activity. It does not provide a complete picture of the chemical, vascular, or metabolic state of the brain.

### 2. EEG electrode lacks anatomical space

An electrode placed over one part of the head does not necessarily record only the cortex directly beneath it.

Imagine several speakers playing in a room and several microphones placed around it. Each microphone receives a different mixture of the speakers. EEG works similarly. Electrical activity spreads through the head by volume conduction, so one electrode can contain signals from multiple neural sources, while one source can appear at multiple electrodes.

There is therefore a mismatch between electrode space and anatomical space. Estimating the original brain sources from scalp measurements is an ill-posed inverse problem: many different source patterns could produce similar signals at the electrodes. Source-localization algorithms can make useful estimates, but only by adding assumptions about anatomy, conductivity, source orientation, smoothness, or sparsity. The resulting brain map is a model-based inference, not a direct photograph.

### 3. EEG has limited access to deep brain regions

Scalp EEG is most sensitive to synchronized activity in relatively superficial cortical populations with favorable orientations. Signals from deep structures such as the amygdala or subthalamic nucleus are weaker by the time they reach the scalp and are difficult to separate from cortical activity and noise.

This does not mean that deep-brain information can never be inferred. Deep activity may influence distributed cortical networks, and researchers have reported estimates using source models, simultaneous EEG-fMRI, or large training datasets. But detecting a cortical proxy correlated with a deep structure is not the same as directly measuring and precisely localizing that structure. Such results depend heavily on the task, model, assumptions, and validation data.

### 4. EEG is a coarse brain-state estimator, not a fine-neuron decoder

EEG reflects population activity: the synchronization and desynchronization of large groups of neurons. This makes it useful for estimating broad or event-related states such as sleep and wakefulness, attention, cognitive workload, movement intention, epileptic activity, sleep spindles, and error processing.

What EEG generally cannot provide robustly is the activity of one neuron, one visual feature detector, or the exact intended movement of a particular finger or vocal muscle. Studies can decode fingers, words, memories, or visual categories above chance under carefully constrained conditions. But this does not mean that EEG has isolated the underlying fine-grained neural code. A decoder may instead use a broad cortical pattern, task timing, sensory cues, muscle activity, or another correlated proxy. Performance within one experiment is not automatically mind reading that generalizes to daily life.

Paradoxically, this limitation may also point toward EEG's most promising future. Instead of expecting EEG to contain every detail by itself, we can give an EEG model context that helps it interpret the signal. For example, ECHO, a contextual sequence-to-sequence Large EEG Model presented at ICLR 2026, provides support EEG samples together with their task and label information. The model then uses the relationships demonstrated by those examples to infer the task and label of a new target EEG sample, adapting to different tasks without updating its parameters. In other words, the context vector is given to the model with EEG. This does not overcome EEG's physical limits, but it can make the correlations within its coarse and noisy signals much more useful than interpreting each recording in isolation.

### 5. EEG is highly susceptible to noise

EEG is easily contaminated by eye movements, blinking, facial and neck muscles, cardiac activity, body motion, cable movement, electrode impedance, and electrical interference. The eyes behave like an electrical dipole, so rotating them produces large voltage changes that can spread across the scalp. Muscle activity can also be much stronger than the brain signals we want to study.

This creates an uncomfortable question: is a model decoding the brain process we claim to study, or is it using another signal coupled to that process?

A classifier may appear highly accurate because participants subtly move their eyes, tense a muscle, hear a cue, or because trials were split in a way that leaks session information. In that sense, EEG models can "cheat." Artifact removal alone is not enough. Researchers need control conditions, artifact-channel analysis, proper train-test separation, cross-session or cross-subject validation, and an honest account of which signals the model may be using.

### 6. EEG varies across people and across time

There is no single abstract, average brain that represents everyone. Head anatomy, electrode contact, age, medication, disease, fatigue, attention, learning, and recording conditions can all change EEG patterns. Even for the same person, a decoder trained today may perform differently tomorrow.

This inter-subject variability and non-stationarity are not minor engineering annoyances. They limit whether a laboratory result can generalize to a new person, session, hospital, or device. Calibration, adaptation, and individualized baselines are often necessary.

Neurofeedback deserves the same caution. A protocol does not simply push every brain toward one universally healthy average. Its meaning depends on the selected signal, task, baseline, feedback rule, and person. Modulating a measurable EEG feature is not automatically equivalent to improving the underlying cognitive or clinical function.

### 7. EEG is powerful when the claim matches the signal

None of these limitations makes EEG a weak technology. Its speed, safety, portability, and cost make it unusually valuable for studying when brain states change and for building systems that work outside a scanner. The problem begins when a population-level, context-dependent signal is marketed as a precise anatomical map or a direct transcript of thought.

EEG is not telepathy. It is a noisy and indirect window into coordinated electrical activity, and that window becomes useful when we respect its shape. The future may not be a model that reads everything from EEG alone, but one that combines EEG with behavior, context, other sensors, and carefully designed interaction. The question is not only, "How much can we decode?" It is also, "What information did the model actually use?"

