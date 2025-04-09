export interface TheoryContent {
  title: string;
  aim: string;
  theory: string[];
  images?: {
    src: string;
    caption: string;
    alt?: string;
  }[];
  procedures?: string[]; // Step-by-step instructions
  apparatus?: string[]; // Required equipment
  observations?: string[]; // Expected observations
  conclusions?: string[]; // Key takeaways
  formulae?: {
    equation: string;
    description?: string; // Optional description for the formula
  }[];
}

export const theoryContent: Record<number, TheoryContent> = {
  // IV-Characteristics Experiment (ID 1)
  1: {
    title: "IV-Characteristics of Semiconductor Devices",
    aim: "To study current-voltage characteristics of semiconductor devices such as diodes and transistors.",
    theory: [
      "IV characteristics refer to the relationship between the current flowing through an electronic device and the voltage applied across its terminals.",
      "For a simple resistor, this relationship is linear as described by Ohm's law (V = IR).",
      "Semiconductor devices like diodes exhibit non-linear IV characteristics due to their junction properties.",
      "A diode allows current to flow easily in one direction (forward bias) but restricts current in the opposite direction (reverse bias).",
      "In forward bias, the current increases exponentially with voltage after exceeding the threshold voltage (typically 0.7V for silicon diodes).",
      "In reverse bias, a very small leakage current flows until breakdown voltage is reached.",
      "The IV curve of a device provides crucial information about its electrical behavior and operating parameters.",
      "Understanding IV characteristics is essential for designing electronic circuits and systems."
    ],
    images: [
      {
        src: "/experiments/iv-characteristics/diode-iv-curve.png",
        caption: "Typical IV curve of a silicon diode showing forward and reverse bias regions",
        alt: "IV characteristics graph of a diode"
      }
    ]
  },
  
  // Numerical Aperture Experiment (ID 2)
  2: {
    title: "Numerical Aperture of Optical Fiber",
    aim: "To determine the numerical aperture of an optical fiber and understand its light-gathering capability.",
    theory: [
      "Numerical Aperture (NA) is a dimensionless quantity that characterizes the range of angles over which an optical fiber can accept or emit light.",
      "It is mathematically defined as: NA = sin(θmax), where θmax is the maximum angle of acceptance.",
      "Light rays entering the fiber at angles greater than θmax will not undergo total internal reflection and will be lost through the cladding.",
      "NA can also be expressed in terms of refractive indices: NA = √(n1² - n2²), where n1 is the refractive index of the core and n2 is the refractive index of the cladding.",
      "A higher NA indicates that the fiber can collect more light from a source.",
      "The NA is an important parameter in determining the light-gathering power and resolution capabilities of optical systems.",
      "In multimode fibers, NA typically ranges from 0.2 to 0.5, while single-mode fibers have lower values around 0.1.",
      "The NA affects bandwidth, signal loss, and connection sensitivity in optical communication systems."
    ],
    images: [
      {
        src: "/experiments/numerical-aperture/acceptance-angle.png",
        caption: "Demonstration of acceptance angle and total internal reflection in an optical fiber",
        alt: "Diagram showing light acceptance in optical fiber"
      }
    ]
  },
  
  // Wedge Shape Experiment (ID 3)
  3: {
    title: "Wedge Shaped Thin Film",
    aim: "Determination of the thickness of paper by obtaining fringes in wedge shaped air film.",
    theory: [
      "A thin wedge shaped air film can be formed by placing two glass plates on each other at one edge and separated by a thin spacer at the opposite edge.",
      "The wedge angle of the wedge shaped thin film is very small.",
      "Wedge shaped film enclosed between the lower surface of upper glass plate and upper surface of lower glass plate has a non uniform thickness 't'.",
      "The thickness t increases linearly with distance away from the edge of the wedge.",
      "The wedge shaped thin films produce equidistant, straight line alternate bright and dark fringes parallel to the edge of the wedge when illuminated with monochromatic light.",
      "Consider a wedge shaped thin film of air formed between two glass plates with small wedge angle by placing a thin spacer between the glass plates.",
      "When the light is incident on the wedge from above, it gets partly reflected from the glass to air boundary at the top of the air film and emerges out as ray BC. The other part of the light is transmitted through the air film (ray BF) and gets reflected at the air to glass boundary and emerges out as ray DE.",
      "The rays reflected from the two bounding surfaces of the film are not parallel (ray BC and DE) they appear to diverge from a point near the film. These rays interfere constructively or destructively producing alternate bright and dark fringes parallel to the edge of the wedge.",
      "The two rays BC and DE reflected from the top and the bottom of the air film has a varying path difference along the length of the film due to variation of the film thickness.",
      "Ray DE travels more distance than Ray BC. The geometrical path difference between rays BC and DE is Δ = 2 μ.t.Cos(r + θ) For air film (μ) 1 with very small angle considering normal incidence (Cos r= 1) we get, Δ = 2t.",
      "Ray DE undergoes a phase change of π which occurs at the air to glass boundary due to reflection at the upper surface of the lower glass plate.",
      "The optical path difference between the rays BC and DE is given as, Δ = 2t + λ/2.",
      "The fringe at the edge of the wedge is always dark. At the edge of wedge the thickness of the film is very small compared to λ i e t << λ.",
      "The optical path difference at the edge is given as, Δ = 2 (μ) t ± λ/2 ≃ ± λ/2. It implies that interfering rays will always be 180° out of phase and destructively interfere at the edge."
    ],
    images: [
      {
        src: "/experiments/wedge-shape/wedge-diagram.png",
        caption: "Wedge-shaped thin film formed between two glass plates",
        alt: "Diagram showing wedge-shaped thin film setup"
      },
      {
        src: "/experiments/wedge-shape/interference-pattern.png",
        caption: "Interference pattern showing alternating bright and dark fringes",
        alt: "Photo of interference pattern in wedge-shaped film"
      }
    ]
  },
  
  // Zener Diode Experiment (ID 4)
  4: {
    title: "Zener Diode Characteristics",
    aim: "To study the voltage regulation property of Zener diodes and analyze their breakdown characteristics.",
    theory: [
      "A Zener diode is a special type of diode designed to reliably operate in the reverse breakdown region without being damaged.",
      "Unlike regular diodes, Zener diodes are specifically manufactured to have a well-defined breakdown voltage (Zener voltage).",
      "When reverse-biased below the breakdown voltage, a Zener diode blocks current like a normal diode.",
      "When the reverse voltage reaches the Zener voltage, the diode allows current to flow in the reverse direction.",
      "The most important characteristic of a Zener diode is that it maintains a nearly constant voltage drop across its terminals over a wide range of currents in the breakdown region.",
      "This constant voltage property makes Zener diodes excellent for voltage regulation applications.",
      "Zener diodes are available with breakdown voltages ranging from a few volts to hundreds of volts.",
      "The breakdown mechanism in Zener diodes involves either the Zener effect (for diodes with VZ < 5V) or avalanche breakdown (for diodes with VZ > 5V)."
    ],
    images: [
      {
        src: "/experiments/zener-diode/zener-iv-curve.png",
        caption: "Current-voltage characteristics of a Zener diode showing breakdown region",
        alt: "IV curve of Zener diode with prominent breakdown region"
      }
    ]
  },
  
  // Newton's Ring Experiment (ID 5)
  5: {
    title: "Newton's Rings Experiment",
    aim: "To observe interference patterns created by a spherical surface in contact with a flat surface and determine the radius of curvature of the spherical surface.",
    theory: [
      "Newton's rings is a classic interference pattern observed when light is reflected between a spherical surface and an adjacent flat surface.",
      "The spherical surface is typically a plano-convex lens placed on a flat glass plate, creating a thin air film of varying thickness.",
      "When light is incident from above, it gets partially reflected from both the bottom surface of the lens and the top surface of the flat plate.",
      "The light rays reflected from these two surfaces interfere with each other, creating a pattern of concentric dark and bright rings.",
      "The condition for constructive interference (bright rings) is 2t = (m+1/2)λ, where t is the thickness of the air film and m is an integer.",
      "The condition for destructive interference (dark rings) is 2t = mλ.",
      "The radius of the nth dark ring is related to the radius of curvature (R) of the lens by: r²n = nλR.",
      "By measuring the diameters of these rings, one can calculate the radius of curvature of the lens."
    ],
    images: [
      {
        src: "/experiments/newtons-ring/ring-pattern.png",
        caption: "Pattern of concentric Newton's rings as seen from above",
        alt: "Interference pattern showing Newton's rings"
      }
    ]
  },
  
  // Hall Effect Experiment (ID 6)
  6: {
    title: "Hall Effect Phenomenon",
    aim: "To study the Hall effect in semiconductors and determine carrier concentration and mobility.",
    theory: [
      "The Hall effect is a phenomenon in which a voltage difference (the Hall voltage) is produced across an electrical conductor, transverse to an electric current and a magnetic field perpendicular to the current.",
      "When a current-carrying conductor or semiconductor is placed in a magnetic field, the charge carriers experience a force (Lorentz force) perpendicular to both the direction of motion and the magnetic field.",
      "This force deflects the charge carriers toward one side of the conductor, creating a potential difference across its width.",
      "The Hall voltage (VH) is given by: VH = (IB)/(neT), where I is the current, B is the magnetic field, n is the carrier concentration, e is the electronic charge, and T is the thickness of the sample.",
      "The sign of the Hall voltage indicates the type of charge carriers (positive for holes, negative for electrons).",
      "The Hall coefficient (RH = VH·T/(I·B)) is inversely proportional to the carrier concentration.",
      "Hall effect measurements are widely used to determine carrier type, concentration, and mobility in semiconductors.",
      "This phenomenon is utilized in Hall effect sensors for detecting magnetic fields in various applications."
    ],
    images: [
      {
        src: "/experiments/hall-effect/hall-setup.png",
        caption: "Schematic diagram of Hall effect experiment setup",
        alt: "Hall effect experimental arrangement showing current, magnetic field, and voltage"
      }
    ]
  },
  
  // Planck's Constant Experiment (ID 7)
  7: {
    title: "Determination of Planck's Constant",
    aim: "To determine Planck's constant using the photoelectric effect with LEDs of different colors.",
    theory: [
      "Planck's constant (h) is a fundamental physical constant that relates the energy of a photon to its frequency.",
      "According to quantum theory, the energy of a photon is E = hf, where f is the frequency of light.",
      "Light Emitting Diodes (LEDs) operate based on the principle of electroluminescence, where electrons release energy as photons when they recombine with holes.",
      "The energy of the emitted photons corresponds to the bandgap energy of the semiconductor material used in the LED.",
      "When a forward bias voltage is applied to an LED, current begins to flow once the voltage exceeds a threshold value.",
      "This threshold voltage (Vth) is related to the bandgap energy by: eVth = Eg = hf, where e is the electronic charge.",
      "By measuring the threshold voltages of LEDs of different colors (frequencies) and plotting Vth against frequency, Planck's constant can be determined from the slope of the graph.",
      "This experiment demonstrates the quantized nature of light and confirms the relationship between photon energy and frequency as predicted by Planck's quantum theory."
    ],
    images: [
      {
        src: "/experiments/plancks-constant/led-spectrum.png",
        caption: "Spectral output of different colored LEDs used in the experiment",
        alt: "Graph showing different colored LED emission spectra"
      }
    ]
  },
  
  // He-Ne Laser Experiment (ID 8)
  8: {
    title: "Helium-Neon Laser Principles",
    aim: "To study the working principle, properties, and applications of a Helium-Neon laser.",
    theory: [
      "The Helium-Neon (He-Ne) laser is a type of gas laser that uses a mixture of helium and neon as the active medium.",
      "The lasing action occurs through a complex energy transfer process between helium and neon atoms.",
      "When an electrical discharge is passed through the gas mixture, helium atoms are excited to metastable energy states.",
      "Through collisions, these excited helium atoms transfer energy to neon atoms, exciting them to higher energy levels.",
      "Population inversion is achieved in the neon atoms, allowing stimulated emission to occur.",
      "The most common He-Ne laser emission is at 632.8 nm, producing a distinctive red beam.",
      "He-Ne lasers typically produce continuous-wave output with power ranging from 0.5 to 50 mW.",
      "Key characteristics of He-Ne lasers include high coherence, monochromaticity, and excellent beam quality, making them suitable for applications in holography, interferometry, barcode scanning, and alignment systems."
    ],
    images: [
      {
        src: "/experiments/he-ne-laser/laser-schematic.png",
        caption: "Schematic diagram of a Helium-Neon laser showing major components",
        alt: "Cross-section view of He-Ne laser tube and components"
      }
    ]
  }
};

export function getTheoryContent(experimentId: number): TheoryContent | undefined {
  return theoryContent[experimentId];
}