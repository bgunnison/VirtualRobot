import beatUi from '../media/BeatUI.png'
import breathalyzerUi from '../media/BreathalyzerUI.png'
import chimeUi from '../media/chimeui.png'
import pinchfxUi from '../media/PinchfxUI.png'
import logoStrip from '../media/beat-logo-strip.png'
import logoSmall from '../media/virtualrobot-logo-small.gif'
import logoCircle from '../media/virtualrobot-logo-circle.png'

export const owner = 'bgunnison'

export const projects = [
  {
    slug: 'beat',
    repo: 'beat',
    branch: 'main',
    title: 'Beat',
    kind: '---',
    heroLine: 'Euclidean rhythm generator',
    summary:
      'Beat is a MIDI generator that outputs eight Euclidean note patterns.',
    details:
      'Settings include bars, loop length, beat count, rotation, note, octave, and loudness for the selected lane, with mute and solo controls kept close.',
    bullets: ['8 rhythm lanes', 'Per-lane Bars / Loop / Beats / Rotate', 'Mute, solo, reset, and lane activity feedback'],
    
    image: beatUi,
    imageAlt: 'Beat plugin UI showing eight Euclidean rhythm lanes and lane controls.',
    strip: logoStrip,
    downloadLabel: 'Download Beat.vst3.zip',
    zipName: 'Beat.vst3.zip',
  },
  {
    slug: 'pinchfx',
    repo: 'PinchFx',
    branch: 'master', 
    title: 'PinchFX',
    kind: '---',
    heroLine: 'Pinch harmonics simulator.',
    summary:
      'PinchFX is a VST3 effect that simulates guitar style pinch harmonics.',
    details:
      'This plugin tracks pitch and excites three resonator voices, caution the resonance goes to 11',
    bullets: ['Pitch-tracked harmonic resonators', 'Three partial voices with feedback and gain', 'Heat, tone, and wet/dry output shaping'],
  
    image: pinchfxUi,
    imageAlt: 'PinchFX plugin UI showing input, output, and three voice harmonic controls.',
    strip: logoStrip,
    downloadLabel: 'Download PinchFX.vst3.zip',
    zipName: 'PinchFX.vst3.zip',
  },
  {
    slug: 'breathalyzer',
    repo: 'breathalyzer',
    branch: 'master',
    title: 'Breathalyzer',
    kind: '---',
    heroLine: 'Breathy, growly instrument.',
    summary:
      'Breathalyzer is a VST3 instrument that turns MIDI notes into breath gestures with expressive mouth color, airy turbulence, voiced body, and vowel motion.',
    details:
      ' Note pitch shifts mouth shape, velocity drives pressure and urgency. Utterance moves the mouth shape.',
    bullets: ['Breath and voice audio path', 'Utterance motion, growl, and humanize controls'],
    image: breathalyzerUi,
    imageAlt: 'Breathalyzer plugin UI showing breath, voice, and humanize controls.',
    strip: logoStrip,
    downloadLabel: 'Download Breathalyzer.vst3.zip',
    zipName: 'Breathalyzer.vst3.zip',
  },
  {
    slug: 'chime',
    repo: 'Chime',
    branch: 'main',
    title: 'Chime',
    kind: 'Instrument',
    heroLine: 'Physically modeled struck bar.',
    summary:
      'Chime is a VST3 instrument that physically models a struck bar with modal synthesis.',
    details:
      'MIDI notes trigger long natural decays, while logarithmic decay, per-note detune, and character selections shape the material response.',
    bullets: ['Struck cylindrical bar / chime model', 'Long ringing decay after note-off', 'Decay, random detune, and material character controls'],
    image: chimeUi,
    imageAlt: 'Chime plugin UI showing decay, detune, and character controls.',
    strip: logoStrip,
    downloadLabel: 'Download Chime.vst3.zip',
    zipName: 'Chime.vst3.zip',
  },
]

export const brandAssets = {
  logoSmall,
  logoCircle,
  logoStrip,
}

export function getSourceUrl(project) {
  return `https://github.com/${owner}/${project.repo}`
}

export function getZipUrl(project) {
  return `https://raw.githubusercontent.com/${owner}/${project.repo}/${project.branch}/${project.zipName}`
}
