# The Abyss Test

The big dispositional characteristics survey.

## Levels

Every level closes on results of its own. Each link below starts the test on that level, and the rest of the run follows.

<table>
  <tr>
    <td align="center" width="50%">
      <b>General</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?source=README"><img src="assets/readme/general.jpg" alt="The results of General" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?source=README"><b>Take the Star Sign Test!</b></a>
    </td>
    <td align="center" width="50%">
      <b>Brain-Body Axis</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=demographics2&amp;source=README"><img src="assets/readme/brainbody.jpg" alt="The results of Brain-Body Axis" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=demographics2&amp;source=README"><b>Take the Body Awareness Test!</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>AI Expertise &amp; Usage</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=bait&amp;source=README"><img src="assets/readme/aiexpertise.jpg" alt="The results of AI Expertise &amp; Usage" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=bait&amp;source=README"><b>Take the AI Test!</b></a>
    </td>
    <td align="center" width="50%">
      <b>Mood &amp; Health</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=demographics3&amp;source=README"><img src="assets/readme/moodhealth.jpg" alt="The results of Mood &amp; Health" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=demographics3&amp;source=README"><b>Take the Wellbeing Test!</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>Character</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=hexaco&amp;source=README"><img src="assets/readme/character.jpg" alt="The results of Character" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=hexaco&amp;source=README"><b>Take the Personality Test!</b></a>
    </td>
    <td align="center" width="50%">
      <b>Archetypes</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=archetypes&amp;source=README"><img src="assets/readme/archetypes.jpg" alt="The results of Archetypes" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=archetypes&amp;source=README"><b>Take the Archetype Test!</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>The World</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=primals&amp;source=README"><img src="assets/readme/world.jpg" alt="The results of The World" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=primals&amp;source=README"><b>Take the Worldview Test!</b></a>
    </td>
    <td align="center" width="50%">
      <b>How You Think</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=icar&amp;source=README"><img src="assets/readme/reasoning.jpg" alt="The results of How You Think" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=icar&amp;source=README"><b>Take the Thinking Style Test!</b></a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>Mind &amp; Heart</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=regulation&amp;source=README"><img src="assets/readme/regulation.jpg" alt="The results of Mind &amp; Heart" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=regulation&amp;source=README"><b>Take the Mind &amp; Heart Test!</b></a>
    </td>
    <td align="center" width="50%">
      <b>Where You Stand</b><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=opinions&amp;source=README"><img src="assets/readme/opinions.jpg" alt="The results of Where You Stand" width="100%"></a><br>
      <a href="https://realitybendinglab.com/TestYourself/?start=opinions&amp;source=README"><b>Take the Political Test!</b></a>
    </td>
  </tr>
</table>

The pictures are drawn from stand-in scores, not anybody's answers, by `assets/readme/make.py`; rerun it when a figure changes.

**Work in progress: Sexuality.** Asked only by the `all` battery, since it is not covered by the ethics application, and with no results of its own yet. [Start on it](https://realitybendinglab.com/TestYourself/index.html?start=sex&battery=all&source=README).

## Includes

What the test currently asks — every questionnaire, its reference and its
dimensions — is the **Content** slide of [the documentation deck](docs/index.html),
which is where that table now lives. Open `docs/index.html`; it needs nothing
installed. **Adding, removing or renaming anything in `content/` means updating
it in the same breath.**

## Options

Everything a link can say about a run goes after the address, e.g.
`https://realitybendinglab.com/TestYourself/?source=MyStudy&battery=test`. The participant is shown none of it.

| Option | What it does | Example |
|---|---|---|
| `?source=` | Where the link was handed out (a project, an experimenter, a page). Written into the saved file and its name, never shown. A link without one is saved as `Unknown`. | `?source=Prolific-Pilot` |
| `?sub=` | The participant's code, for a prewritten list or a platform's own id. Only `A-Z a-z 0-9 _ -` survive, 32 characters at most; otherwise a code is made up. | `?sub=P0042` |
| `?battery=` | Ask a named preset of blocks out of `BATTERIES` in `content/timeline.js`. With none, or an unknown name, the run asks `default`: the whole test but the blocks still being written. `all` asks those too (currently the sexuality block, which is not covered by the ethics application). | `?battery=all` |
| `?only=` | Ask exactly these blocks (comma-separated), for testing. Applied over `battery`. | `?only=mint,icar` |
| `?skip=` | Ask everything but these blocks. Applied after `only`. | `?skip=opinions` |
| `?start=` | Bring the levels holding these blocks to the front, in the order named; the rest follow as usual. Moves whole levels and asks nothing the battery left out. | `?start=icar` |
| `?test=true` | Test mode (or a bare `?test`): each questionnaire shrinks to one item, the rest are answered at random, and the consent gate opens unread. Still sends a real file, prefixed `test_`. | `?test=true&start=opinions` |
| `?card=1&s=` | Show somebody's whole-run profile web rather than the test. Made by the profile's "Copy share link", not by hand. | `?card=1&s=Curiosity~3.8,…` |
| `?card=1&level=&s=` | Show one level's results out of a shared link, with `m=` and `d=` (a birth month and a stand-in day) for level 1's star sign. Made by a level's "Copy link". | `?card=1&level=Character&s=…` |

Options combine with `&`. The blocks, in timeline order, are `demographics1`, `fipi`, `singles` (General);
`demographics2`, `mint` (Brain-Body Axis); `bait` (AI Expertise & Usage); `demographics3`, `mood`, `health`, `hitop`
(Mood & Health); `hexaco` (Character); `archetypes`; `primals` (The World); `icar` (How You Think); `regulation`
(Mind & Heart); `opinions` (Where You Stand); `sex` (Sexuality, asked only by `battery=all`); and `closing`, which is
always asked. `mood` and `hitop` are asked or
skipped together.

## Similar tests online

Worth going back to for what to add next and how to present it.

- **[TakeTest](https://taketest.xyz/)**: some forty free tests, most of them published instruments — the BFI-2, the IPIP-NEO-300, the Short Dark Triad, the ICAR-16 and ICAR-60, the MMPI-2 in full and short, the Autism-Spectrum Quotient, the Moral Foundations Questionnaire-2, right- and left-wing authoritarianism, conspiracy and paranormal belief scales, vocabulary and civics tests. Each is scored against a large normed sample (the UK Biobank, the General Social Survey), results collect in one place across tests, and signing in keeps them across devices. Ideas for tests, and for where real norms come from.
- **[Dimensional](https://www.dimensional.me/)** (an app): fifteen dimensions and "over 200 traits", from personality and values to love styles, attachment, attitudes to sexuality and political ideology, with profiles compared between friends and "compatibility" readings. No science claimed. Ideas for features: comparing with somebody else, and a reason to come back.
- **[Aella's surveys](https://aella.lol/)**: large self-run online surveys, some on far more extreme ground than anything here — the Big Kink Survey asks about zoophilia and incest, among much else — whose anonymised data from thousands of respondents have been made public, with respondents agreeing to it and no major harm reported. A precedent worth citing if the ethics reviewers push back on the sensitivity of our own items (diagnoses, political opinions) or on releasing the data openly: by comparison, what we ask is mild.

## Questionnaire Ideas

Not asked yet. "Partly there" names what the test already asks on the same ground.

| Domain | Idea | Notes | Partly there |
|---|---|---|---|
| Humour | Being funny, dark humour | | |
| Cognition | Wordsum | A short vocabulary test, heavily g-loaded ([thread](https://x.com/cremieuxrecueil/status/2098586478443901419?s=20)) | ICAR-16 (How You Think) |
| Cognition | Imagery across the senses | Short form of the PSIQ | |
| Cognition | Sensory sensitivity | Visual especially: it predicts everything | |
| Cognition | Obsessive-compulsive beliefs | Perfectionism, intolerance of uncertainty, control of thoughts | |
| Cognition | Cross-modal correspondences | | |
| Cognition | Abstract vs. concrete construal | | |
| Cognition | Rumination and worry | | CERQ's Rumination (Mind & Heart) |
| Cognition | Intolerance to Uncertainty | |  |
| Unusual experiences | Paranormal beliefs | | |
| Unusual experiences | Unusual sensory experiences | | HiTOP-BR's Unusual Experiences (Mood & Health) |
| Unusual experiences | Fantasy proneness | | |
| Unusual experiences | Psychotic experiences | | HiTOP-BR's Unusual Experiences (Mood & Health) |
| Identity | Masculine–feminine | | |
| Hormones | Menstrual cycle phase, contraceptive use, last sexual activity | For females. Needs a line saying why it is asked (conscious experience is shaped by hormonal state, which influences cognition and emotion) and a way to skip | |
| Sleep | Parasomnias and boundary failures | IOWA / MPS. **Ask Giulia about the validation of her scale** | |
| Sleep | Sleep health | SATED | SQS single (Mood & Health) |
| Sleep | Dreams | DIQ | |
| Sleep | Daytime sleepiness | ESS (Epworth) | |
| Family and work | Relationship status and satisfaction | | |
| Family and work | Dependents | | |
| Family and work | Occupation and job satisfaction | Would let `gjs` (in `content/block_UNUSED.js`) be asked, which waits on an employment item | |
| Sexuality | Sexual orientation | Kinsey scale? | |
| Sexuality | Sex-life satisfaction | The WHO scales cover many life domains, this among them, and are short | |
| Sexuality | Kinkiness | Aella's measures | |
| Self and others | Attachment style | | |
| Self and others | Empathy | | |
| Self and others | Peripersonal space | We made an avatar task for this a while back | |
| Self and others | Public and private self-consciousness | | |
| Self and others | Shame and disgust | | |
| Self and others | Social connection | | |
| Self and others | Suggestibility | | |
| Self and others | PCS? | | |
| Wellbeing and emotions | Coping | | CERQ-short (Mind & Heart) |
| Wellbeing and emotions | Self-rated health | | Health single (General) |
| Wellbeing and emotions | Dimorphous emotions | | |
| Wellbeing and emotions | Mattering | | |
| Wellbeing and emotions | Wisdom | | |
| Wellbeing and emotions | Aesthetic experiences | | `Aesthetics_Beauty` single (General) |
| Politics | Words Can Harm Scale (WCHS) | | |
| Politics | Nietzscheanism | | |
| Relationship with AI | Relationship | See below | BAIT (AI Expertise & Usage) |
| Relationship with AI | Revelation | See below | |
| Relationship with AI | Roles given to a chatbot | Companion, friend, therapist, romantic partner, sexual partner, as one tick-any-number item, after Buck & Maheux (2026, *JMIR*) | |

**Relationship with AI**, for the `bait` block. The "AI psychosis" reports describe a spiral that starts with a bond and ends in
revelation, so measure the stages rather than the outcome: two facets on the BAIT's own 0–6 scale, asked only above "Never" on
`BAIT_Usage`, under a key prefix of their own, scored without norms and fed back nowhere.

- *Relationship*: I have felt closer to an AI than to most people I know · I would rather talk something through with an AI than
  with a person · I feel a sense of loss when a conversation with an AI ends or its memory is reset · I talk about things with AI
  that I don't talk about with people close to me · I have kept how much I talk to AI from the people close to me
- *Revelation*: I have developed ideas with an AI that I have not been able to share with anyone in my life · AI makes real
  breakthroughs about the nature of the world accessible to anyone · Through AI, I have come to understand things about myself
  and the world that most people never will

Buck & Maheux's GAATES items ("AI helps me make sense of secret messages intended only for me", "I've discovered hidden truths
about the world through AI") are the clinical end of the same ground.

## Inspiration and Resources

- https://taketest.xyz/
- https://openpsychometrics.org/
- https://openpsychometrics.org/_rawdata/
- https://aella.lol/
- https://chaosfactor.xyz/

- Synthetic data
  - https://openrouter.ai/
  - https://github.com/browser-use/browser-use
  - https://pypi.org/project/surveyshield-py/0.2.0/
  - https://survey-shield.com/