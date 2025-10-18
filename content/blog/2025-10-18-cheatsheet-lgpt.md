---
author: mauro_brianza
categories:
    - Tutorial
    - Cheatsheet
tags:
    - "2025"
    - "LGPT"
date: "2025-10-18T22:50:04+02:00"
draft: false
highlight: false
title: LGPT Notes
---

Recentemente mi è risalita la scimmia con LGPT e non trovavo più questo file sul mio PC. Sicuro può tornare utile a qualcuno.

# LGPT Cheatsheet

- step:
    - [`ARPG wxyz` Arpeggio](#arpg-wxyz-arpeggio)
    - [`DLAY --xx` Delay](#dlay---xx-delay)
    - [`KILL --xx` Kill](#kill---xx-kill)
    - [`LEGA xxyy` Legato](#lega-xxyy-legato)
    - [`PTCH xxyy` Pitch](#ptch-xxyy-pitch)
- instrument:
    - [`PAN  xxyy` Pan](#pan-xxyy-pan)
    - [`PFIN xxyy` Pitch Finetune](#pfin-xxyy-pitch-finetune)
    - [`VOLM xxyy` Volume](#volm-xxyy-volume)
    - [`CRSH xx-y` Drive Crush](#crsh-xx-y-drive-crush)
    - filter:
        - [`FLTR xxyy` Filter](#fltr-xxyy-filter)
        - [`FCUT xxyy` Filter Cut](#fcut-xxyy-filter-cut)
        - [`FRES xxyy` Filter Resonance](#fres-xxyy-filter-resonance)
    - feedback:
        - [`FBMX xxyy` Feedback Mix](#fbmx-xxyy-feedback-mix)
        - [`FBTN xxyy` Feedback Tune](#fbtn-xxyy-feedback-tune)
- playback:
    - [`LPOF xxxx` Loop Offset](#lpof-xxxx-loop-offset)
    - [`PLOF xxyy` Play Offset](#plof-xxyy-play-offset)
- tables:
    - [`HOP  xx-y` Hop (Tables)](#hop-xx-y-hop-tables)
    - [`IRTG --xx` Instrument Re-trigger](#irgt---xx-instrument-re-trigger)
    - [`RTRG xxyy` Re-trigger](#rtrg-xxyy-re-trigger)
    - [`TABL --xx` Table](#tabl---xx-table)
- midi:
    - [`MDCC xxyy` Midi Continuous Control](#mdcc-xxyy-midi-continuous-control)
    - [`MDPG --xx` Midi Program Change](#mdpg---xx-midi-program-change)
- miscellaneous:
    - [`HOP  ---y` Hop (Phrases)](#hop----y-hop-phrases)
    - [`TMPO -xxx` Tempo](#tmpo--xxx-tempo)

<template>
## `CMMD wxyz` COMMAND
- DESC
### Parameters:
- PARAM: DESC...
    - RANGES...
    - EDGE CASES VALUES...
### Examples:
- GENERIC EXAMPLE
- EDGE CASES EXAMPLES...
</template>

## `ARPG wxyz` Arpeggio

Loop through relative pitches of `+0`, `+w`, `+x`, `+y`, `+z` semitones. Leftmost `0`s are ignored.

Speed of the arpeggiator is costant and can't be changed

### Parameters:
- `w`, `x`, `y`, `z`: offset in semitones

### Examples:
- `ARPG 3000`: loops between `+0` and `+3` semitones
- `ARPG 4050`: loops through `+0`, `+4`, `+0` and `+5` semitones



## `CRSH xx-y` Drive Crush

Override `drive` and `crush` instrument settings. 

### Parameters:
- `xx`: pre crush drive
    - `00`: no change
    - `01 ~ FF`: target drive value
- `y`: crush setting in bits
    - `1 ~ F`: 1 to 16 bits

### Examples:
- `CRSH 0001`: set 1bit crush withtout changing drive
- `CRSH 4007`: set drive to `40`, crush to 8 bits



## `DLAY --xx` Delay

Delay current note by `xx` ticks

### Parameters
- `xx`: delay in ticks

### Examples
With a standard `6/6` ticks groove:
- `DLAY 0006`: plays the note on the next step
- `DLAY 0003`: plays the note between current and next step



## `FCUT xxyy` Filter Cut

Adjust filter cutoff from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: target cutoff value

### Examples
- `FCUT 0080`: immediatly set cutoff to `80`
- `FCUT F000`: slowly close filter



## `FLTR xxyy` Filter

Apply low pass filter with cutoff `xx` and resonance `yy`

### Parameters
- `xx`: cutoff value
    - `00`: no change
- `yy`: renonance value
    - `FF`: no change

### Examples
- `FLTR 7F40`: set lp filter with cutoff `7F` and renonance `40`
- `FLTR 00FF`: unadultered sound



## `FRES xxyy` Filter Resonance

Adjust filter resonance from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: target resonance value

### Examples
- `FRES 0080`: immediatly set resonance to `80`
- `FRES F000`: slowly remove resonance



## `FBMX xxyy` Feedback Mix

Adjust feedback mix from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: target feedback mix value

### Examples
- `FBMX 0080`: immediatly set feedback mix to `80`
- `FBMX F000`: slowly remove feedback mix



## `FBTN xxyy` Feedback Tune

Adjust feedback tune from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: target feedback tune value

### Examples
- `FBTN 0080`: immediatly set feedback tune to `80`
- `FBTN F000`: slowly set feedback tuning to `00`



## `HOP ---y` Hop (Phrases)

In _phrases_, play position will jump to the next phrase in the chain at step `y`

- `HOP` is instant: instrument triggers and commands on the same row will be run
- has no effect on instruments

### Parameters

- `y`: target step in the next phrase

### Examples

The following setup skips over notes in both phrases during playback:
```
phrase 01               phrase 02
00 ----|-- ---- 0000    00 ----|-- ---- 0000
01 ----|-- ---- 0000    01 ----|-- ---- 0000
02 ----|-- ---- 0000    02 ----|-- ---- 0000
03 ----|-- HOP- 0004    03 C--4|-- ---- 0000
04 ----|-- ---- 0000    04 ----|-- ---- 0000
05 ----|-- ---- 0000    05 ----|-- ---- 0000
06 C--3|-- ---- 0000    06 ----|-- ---- 0000
07 ----|-- ---- 0000    07 ----|-- ---- 0000
08 ----|-- ---- 0000    08 ----|-- ---- 0000
09 ----|-- ---- 0000    09 ----|-- ---- 0000
0A ----|-- ---- 0000    0A ----|-- ---- 0000
0B ----|-- ---- 0000    0B ----|-- ---- 0000
0C ----|-- ---- 0000    0C ----|-- ---- 0000
0D ----|-- ---- 0000    0D ----|-- ---- 0000
0E ----|-- ---- 0000    0E ----|-- ---- 0000
0F ----|-- ---- 0000    0F ----|-- ---- 0000
```



## `HOP xx-y` Hop (Tables)

In _tables_, cursor position will jump to row `yy` exactly `xx` times, then passes through the command itself

- `HOP` is instant and can jump only in the same column (meaning each column is independent)

### Parameters

- `xx`: number of jumps to target position
    - `00`: always jump
- `y`: target row in table to jump to

### Examples

(Rest of the table omitted)
```
00 ---- 0000
01 ---- 0000 <--+ goes back 2 times here,
02 ---- 0000    | then continues towards KILL
03 HOP- 0201 ---+
04 KILL 0000
05 ---- 0000
06 ---- 0000
07 ---- 0000
08 ---- 0000
09 ---- 0000
0A ---- 0000
0B ---- 0000
0C ---- 0000
0D ---- 0000
0E ---- 0000
0F ---- 0000
```


## `IRGT --yy` Instrument Re-trigger

Re-triggers current instrument transposed by `yy` semitones.

Gives tables the abiity to work as programmable phrases that then can be triggered simply bychanging tables.

Re-triggrered instrument is not reset.

### Parameters
- `yy`: transpose is semitones. cumulative with each `IRGT`



## `KILL --xx` Kill

Istrument will stop playing after `xx` ticks

### Parameters
- `xx`: delay in ticks



## `LEGA xxyy` Legato

Perform exponetial pitch slide to pitch `yy` at speed `xx`

- if an instrument is not triggered on the same row as `LEGA`, the command will retrigger the previous instrument unless is still playing

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: slide distance in semitones
    - `00 ~ 7F`: upwards (increase in semitones)
    - `80 ~ FF`: downards (decrease in semitones)



## `LPOF xxxx` Loop Offset

Shift both loop start and loop end values by `xxxx`

- resets everytime you start a new note (similar to `VOLM`, `PTCH`)
- `LPOF` can't trigger a note, must be executed after a sample is playing
- every time you trigger a sample, `LPOF` is set back to the instrument parameters

### Parameters
- `xxxx`: offset in hexadecimal milliseconds
    - `0000`: no change
    - `0001 ~ 7FFF`: positive offset (add milliseconds, `1 ~ 32767`)
    - `8000 ~ FFFF`: negative offset (subtract milliseconds, `-1 ~ -32767`)

### Examples

- `LPOF 0B4A`: play sample from 2.890 seconds


## `MDCC xxyy` Midi Continuous Control

Sends a MIDI `Continuous Control` messagge on the MIDI channel of the currently running instrument.

### Parameters
- `xx`: controll number
- `yy`: value



## `MDPG --xx` Midi Program Change

Sends a MIDI `Program Change` messagge on the MIDI channel of the currently running instrument.

### Parameters
- `xx`: program number
    - `00 ~ FF`: program change `1` to `32`



## `PAN  xxyy` Pan

Adjust pan from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: target pan
    - `00 ~ 7E`: right
    - `7F`: centered
    - `80 ~ FF`: left

### Examples
- `PAN  00FF`: immediatly set pan to left
- `PAN  F000`: slowly set pan to right



## `PFIN xxyy` Pitch Finetune

Adjust detune parameter from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: target semitone
    - `00`: return to root center
    - `01 ~ 80`: upwards (increase up to 1 semitone)
    - `81 ~ FF`: downards (decrease up to 1 semitone)

### Examples
- `PFIN 0000`: immediatly tune to left
- `PFIN F0FF`: slowly decrease by 1 semitone




## `PLOF xxyy` Play Offset

Virtually splits the sample in 256 chucks, jumping absolutely to chunk `(xx + yy) mod 256`.

### Parameters
- `xx`: aboslute slice position
- `yy`: offset in slices

### Examples
- `PLOF 8000`: play sample from the middle
- `PLOF 2040`: play sample from slice `80`
- `PLOF 8080`: play sample from start



## `PTCH xxyy` Pitch

Perform linear pitch slide to pitch `yy` at speed `xx`

- if an instrument is not triggered on the same row as `PITCH`, the command will retrigger the previous instrument unless is still playing

### Parameters
- `xx`: speed
    - `00`: instant change
    - `01 ~ FF`: fast to slow
- `yy`: slide distance in semitones
    - `00 ~ 7F`: upwards (increase in semitones)
    - `80 ~ FF`: downards (decrease in semitones)



## `RTRG xxyy` Re-trigger

Regtrigger the sound by looping the sample from current play position over a certain amount of ticks

### Parameters
- `xx`: loop offset per retrigger
- `yy`: loop duration in ticks

### Examples
- `RTRG 0001`: loop 1 tick from current play position
- `RTRG 0102`: loop 2 ticks but move the loop 1 tick forward every loop



## `TABL --xx` Table

Trigger table `xx`

### Parameters
- `xx`: table id



## `TMPO -xxx` Tempo

Change tempo to `xxx`

### Parameters
- `xxx`: tempo in hexadecimal bpm
    - `000`: no change
    - `03C ~ 190`: accepted values (`60bpm ~ 400bpm`)



## `VOLM xxyy` Volume

Adjust instrument volume from instrument value to value `yy` at speed `xx`

### Parameters
- `xx`: time in ticks
    - `00`: instant change
- `yy`: target volume value

### Examples
- `VOLM 0000`: immediatly mute
