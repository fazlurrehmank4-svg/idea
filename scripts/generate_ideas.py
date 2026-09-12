import json
import random
import os

# Ensure deterministic yet realistic generation
random.seed(42)

CATEGORIES = [
    ("Medicine & Healthcare", "med", 100, [
        ("Cardiology", "cardiology"),
        ("Neurology", "neurology"),
        ("Oncology", "oncology"),
        ("Public Health", "public-health"),
        ("Telemedicine", "telemedicine"),
        ("Bioinformatics", "bioinformatics"),
        ("Pharmacology", "pharmacology"),
        ("Nursing", "nursing"),
        ("Dentistry", "dentistry"),
        ("Veterinary Medicine", "veterinary")
    ]),
    ("Engineering", "eng", 120, [
        ("Mechanical Engineering", "mechanical"),
        ("Electrical Engineering", "electrical"),
        ("Civil Engineering", "civil"),
        ("Chemical Engineering", "chemical"),
        ("Aerospace Engineering", "aerospace"),
        ("Robotics", "robotics"),
        ("Mechatronics", "mechatronics"),
        ("Biomedical Engineering", "biomedical"),
        ("Industrial Engineering", "industrial"),
        ("Environmental Engineering", "environmental")
    ]),
    ("Computer Science & IT", "cs", 150, [
        ("AI / Machine Learning", "ai-ml"),
        ("Web Development", "web-dev"),
        ("Mobile App Development", "mobile"),
        ("Cybersecurity", "cybersecurity"),
        ("Blockchain & Web3", "blockchain"),
        ("Quantum Computing", "quantum"),
        ("AR / VR & Metaverse", "ar-vr"),
        ("Cloud Computing", "cloud"),
        ("DevOps & Infrastructure", "devops"),
        ("Game Development", "game-dev"),
        ("Data Science & Analytics", "data-science")
    ]),
    ("Law & Legal Studies", "law", 70, [
        ("Constitutional Law", "constitutional"),
        ("Criminal Law & Justice", "criminal"),
        ("Corporate & Business Law", "corporate"),
        ("Intellectual Property Law", "ip-law"),
        ("Cyber Law & Data Privacy", "cyber-law"),
        ("Human Rights Law", "human-rights"),
        ("International Law", "international"),
        ("Environmental Law", "environmental-law")
    ]),
    ("Business & Commerce", "biz", 80, [
        ("Marketing & Growth Strategies", "marketing"),
        ("Corporate Finance & Investment", "finance"),
        ("Human Resource Management", "hr"),
        ("Entrepreneurship & Startups", "entrepreneurship"),
        ("Supply Chain & Logistics", "supply-chain"),
        ("E-Commerce Strategy", "e-commerce"),
        ("Fintech Innovations", "fintech")
    ]),
    ("Pure Sciences", "sci", 100, [
        ("Physics & Quantum Mechanics", "physics"),
        ("Chemistry & Material Science", "chemistry"),
        ("Biology & Genetics", "biology"),
        ("Mathematics & Topology", "math"),
        ("Statistics & Probability", "statistics"),
        ("Geology & Earth Science", "geology"),
        ("Astronomy & Astrophysics", "astronomy"),
        ("Environmental Science", "env-science")
    ]),
    ("Social Sciences", "soc", 70, [
        ("Psychology & Cognitive Science", "psychology"),
        ("Sociology & Social Dynamics", "sociology"),
        ("Economics & Policy", "economics"),
        ("Political Science", "political-science"),
        ("Anthropology", "anthropology"),
        ("Human Geography", "geography"),
        ("Modern History", "history")
    ]),
    ("Arts & Humanities", "art", 60, [
        ("Literature & Comparative Studies", "literature"),
        ("Philosophy & Ethics", "philosophy"),
        ("Linguistics & Phonetics", "linguistics"),
        ("Musicology & Sound Design", "music"),
        ("Fine Arts & Visual Media", "fine-arts"),
        ("UI/UX & Product Design", "design"),
        ("Film & Media Production", "film"),
        ("Theater & Performing Arts", "theater")
    ]),
    ("Education", "edu", 50, [
        ("Pedagogy & Teaching Methods", "pedagogy"),
        ("Educational Technology (EdTech)", "edtech"),
        ("Curriculum & Instructional Design", "curriculum"),
        ("Special Education & Accessibility", "special-ed")
    ]),
    ("Agriculture & Environment", "agr", 50, [
        ("Agritech & Smart Farming", "agritech"),
        ("Sustainability & Circular Economy", "sustainability"),
        ("Climate Science & Mitigation", "climate"),
        ("Renewable Energy Systems", "renewable-energy"),
        ("Wildlife Conservation", "wildlife")
    ]),
    ("School-Level Projects", "sch", 100, [
        ("Middle School Science Fair", "class-6-8"),
        ("High School STEM Project", "class-9-10"),
        ("Advanced High School Research", "class-11-12"),
        ("Hands-on DIY & Electronics", "diy-stem")
    ]),
    ("Emerging Tech", "emg", 50, [
        ("Internet of Things (IoT)", "iot"),
        ("Drone & Unmanned Aerial Tech", "drones"),
        ("3D Printing & Additive Mfg", "3d-printing"),
        ("Biotechnology & Synthetic Bio", "biotech"),
        ("Nanotechnology", "nanotech"),
        ("Space Exploration Tech", "space-tech")
    ])
]

LEVELS = ["School", "Undergraduate", "Masters", "PhD", "Professional"]
DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"]
BUDGETS = ["Low", "Medium", "High"]
TEAM_SIZES = ["1", "1-2", "1-3", "2-4", "3-5"]
DURATIONS = ["1-2 weeks", "1 month", "2-3 months", "3-6 months", "6-12 months", "1-2 years"]

TECH_STACK_POOL = {
    "Medicine & Healthcare": ["Python", "TensorFlow", "PyTorch", "OpenCV", "DICOM", "R", "MATLAB", "FHIR API", "Scikit-learn"],
    "Engineering": ["SolidWorks", "ANSYS", "MATLAB", "Arduino", "Raspberry Pi", "C++", "ROS2", "AutoCAD", "LabVIEW"],
    "Computer Science & IT": ["Next.js", "TypeScript", "Python", "Docker", "Kubernetes", "PyTorch", "Solidity", "Rust", "Go", "Tailwind CSS", "PostgreSQL", "AWS"],
    "Law & Legal Studies": ["Legal NLP", "Python", "spaCy", "LexisNexis API", "CourtListener API", "Tableau", "NVivo"],
    "Business & Commerce": ["Python", "R", "PowerBI", "Tableau", "SQL", "Excel", "Google Analytics", "Mixpanel"],
    "Pure Sciences": ["Python", "SciPy", "NumPy", "MATLAB", "R", "Mathematica", "LaTeX", "C++", "COMSOL"],
    "Social Sciences": ["SPSS", "NVivo", "R", "Python", "Qualtrics", "Stata", "ArcGIS", "Gephi"],
    "Arts & Humanities": ["Blender", "Figma", "Ableton Live", "Max/MSP", "Processing", "Python", "Adobe Creative Cloud"],
    "Education": ["React", "Next.js", "Tailwind CSS", "Canvas API", "Python", "Node.js", "MongoDB"],
    "Agriculture & Environment": ["Arduino", "LoRaWAN", "Raspberry Pi", "QGIS", "Python", "OpenCV", "TensorFlow"],
    "School-Level Projects": ["Scratch", "Arduino", "Micro:bit", "Python", "HTML/CSS", "Cardboard & Sensors", "Tinkercad"],
    "Emerging Tech": ["ESP32", "ROS2", "Python", "C++", "PyTorch", "Fusion 360", "Keras", "MQTT"]
}

RESOURCES_POOL = [
    "https://github.com/topics/research-project",
    "https://arxiv.org",
    "https://kaggle.com",
    "https://sciencedirect.com",
    "https://ieee.org",
    "https://pubmed.ncbi.nlm.nih.gov",
    "https://nature.com",
    "https://github.com/awesome-projects"
]

TOPIC_PATTERNS = [
    "Design and Implementation of {adj} {noun} for {target}",
    "Development of a {adj} {noun} System using {tech}",
    "Comparative Analysis of {adj} {noun} in {target}",
    "{adj} {noun}: A Novel Approach to {target}",
    "Optimizing {noun} Performance via {adj} {tech}",
    "Automated {noun} Detection and Monitoring for {target}",
    "Next-Generation {adj} {noun} Framework",
    "Sustainable {noun} Solution for {target}"
]

NOU_DICT = {
    "Medicine & Healthcare": ["Diagnostic Tool", "Patient Monitoring System", "Biomarker Tracker", "Telehealth Platform", "Drug Screening Pipeline", "Predictive Analytics Model", "Surgical Navigation Assistant", "Rehabilitation Tracker"],
    "Engineering": ["Robotic Arm", "Autonomous Navigation Unit", "Energy Harvesting System", "Structural Health Monitor", "Fluid Dynamics Simulation", "Thermal Management Device", "Smart Microgrid Controller", "Waste Heat Recovery Module"],
    "Computer Science & IT": ["Decentralized Identity System", "Real-Time Object Tracker", "Zero-Trust Security Gateway", "Neural Code Translator", "Microservices Analytics Dashboard", "Distributed Ledger Framework", "Edge AI Inference Pipeline", "Autonomous Agent Swarm"],
    "Law & Legal Studies": ["Legal Contract Analyzer", "Privacy Compliance Framework", "Intellectual Property Auditor", "Criminal Recidivism Risk Assessor", "Cross-Border Data Protocol", "Smart Contract Arbitration System", "Human Rights Monitoring Tool", "Environmental Regulation Index"],
    "Business & Commerce": ["Dynamic Pricing Engine", "Customer Churn Predictor", "Supply Chain Optimization Model", "Algorithmic Trading Bot", "Consumer Sentiment Tracker", "ESG Benchmark Framework", "Omnichannel Loyalty System", "Micro-Loan Credit Scoring Tool"],
    "Pure Sciences": ["Quantum Entanglement Simulator", "Spectral Analysis Pipeline", "Molecular Docking Workbench", "Gravitational Wave Data Filter", "Climate Tipping Point Detector", "Particle Collision Trajectory Model", "Protein Folding Predictor", "Crystal Structure Generator"],
    "Social Sciences": ["Social Media Polarization Tracker", "Urban Mobility Behavior Analyzer", "Economic Disparity Index", "Cognitive Workload Assessor", "Electoral Disinformation Detector", "Cultural Heritage Preservation Platform", "Mental Health Survey Suite", "Migration Trend Predictor"],
    "Arts & Humanities": ["Interactive Algorithmic Art Installation", "Generative Spatial Sound Engine", "Digital Humanities Text Corpus", "Ethical AI Philosophy Framework", "Interactive Narrative Branching Engine", "Typography Accessibility Audit", "AR Cinema Experience", "Linguistic Dialect Mapper"],
    "Education": ["Gamified Adaptive Learning Portal", "Automated Essay Evaluator", "Inclusive Assistive Reader", "VR STEM Laboratory Simulator", "Student Engagement Analytics System", "Micro-Learning Quiz Engine", "Peer Code Review Platform", "Multilingual Literacy Assistant"],
    "Agriculture & Environment": ["Precision Crop Disease Detector", "IoT Soil Nutrient Analyzer", "Solar Powered Irrigation Controller", "Urban Vertical Farm Monitor", "Forest Fire Early Warning Network", "Methane Emission Tracker", "Biodiversity Mapping Drone", "Ocean Plastic Cleanup Robot"],
    "School-Level Projects": ["Solar-Powered Water Purifier", "Smart Plant Watering Alarm", "Mini Wind Turbine Generator", "Obstacle Avoiding Robot Car", "Hand Hygiene Timer & Monitor", "Home Weather Station", "Automated Trash Sorter", "Paper-Based Microfluidics Kit"],
    "Emerging Tech": ["Smart Wearable Biomarker Sensor", "Autonomous Swarm Drone Scout", "3D-Printed Custom Bio-Scaffold", "Nano-Sensor Environmental Detector", "Satellite CubeSat Payload Module", "Brain-Computer Interface Prototype", "Soft Robotic Gripper", "Quantum Key Distribution Simulator"]
}

ADJ_LIST = ["Autonomous", "Predictive", "Next-Gen", "Sustainable", "Intelligent", "Low-Cost", "Adaptive", "Decentralized", "High-Precision", "Scalable", "Robust", "Interactive", "AI-Driven", "Energy-Efficient"]
TARGET_LIST = ["Rural Healthcare", "Industrial Automation", "Smart Cities", "Environmental Conservation", "Higher Education", "Financial Inclusion", "Space Exploration", "Small Business Security", "Clinical Diagnostics", "Disaster Management"]

def generate_idea(cat_name, prefix, index, subfields):
    subfield_name, subfield_tag = random.choice(subfields)
    noun = random.choice(NOU_DICT[cat_name])
    adj = random.choice(ADJ_LIST)
    target = random.choice(TARGET_LIST)
    tech = random.choice(TECH_STACK_POOL[cat_name])

    title_pattern = random.choice(TOPIC_PATTERNS)
    title = title_pattern.format(adj=adj, noun=noun, target=target, tech=tech)

    # Choose level appropriate for category
    if cat_name == "School-Level Projects":
        level = "School"
        difficulty = random.choice(["Beginner", "Intermediate"])
    elif cat_name in ["Emerging Tech", "Medicine & Healthcare"]:
        level = random.choice(["Undergraduate", "Masters", "PhD", "Professional"])
        difficulty = random.choice(["Intermediate", "Advanced", "Expert"])
    else:
        level = random.choice(["Undergraduate", "Masters", "PhD", "Professional"])
        difficulty = random.choice(["Beginner", "Intermediate", "Advanced", "Expert"])

    duration = random.choice(DURATIONS)
    budget = random.choice(BUDGETS)
    team_size = random.choice(TEAM_SIZES)
    impact_score = round(random.uniform(7.5, 9.9), 1)
    trending = random.random() < 0.25 # 25% trending

    item_id = f"{prefix}-{index:03d}"

    description = (
        f"This project focuses on {title.lower()}. "
        f"It addresses crucial challenges in {subfield_name.lower()} by leveraging modern tools such as {tech}. "
        f"Designed for {level.lower()} level researchers and practitioners aimed at delivering scalable, real-world impact."
    )

    objectives = [
        f"Analyze core mechanics and requirements for {noun.lower()} in {subfield_name.lower()}.",
        f"Develop and evaluate prototype models using {tech}.",
        f"Benchmark system accuracy, performance, and field readiness against baseline metrics."
    ]

    # Pick tech stack
    tech_stack = random.sample(TECH_STACK_POOL[cat_name], min(3, len(TECH_STACK_POOL[cat_name])))
    if tech not in tech_stack:
        tech_stack[0] = tech

    # Tags
    tags = list(set([
        cat_name.lower().replace(" & ", "-").replace(" ", "-"),
        subfield_tag,
        adj.lower(),
        tech.lower().replace(" ", "-")
    ]))

    resources = random.sample(RESOURCES_POOL, 2)

    return {
        "id": item_id,
        "title": title,
        "field": cat_name,
        "subfield": subfield_name,
        "level": level,
        "difficulty": difficulty,
        "duration": duration,
        "description": description,
        "objectives": objectives,
        "techStack": tech_stack,
        "resources": resources,
        "tags": tags,
        "budget": budget,
        "teamSize": team_size,
        "impactScore": impact_score,
        "trending": trending
    }

def main():
    all_ideas = []

    for cat_name, prefix, count, subfields in CATEGORIES:
        print(f"Generating {count} ideas for category: {cat_name}...")
        for i in range(1, count + 1):
            idea = generate_idea(cat_name, prefix, i, subfields)
            all_ideas.append(idea)

    print(f"Total ideas generated: {len(all_ideas)}")

    # Verify exact 1000
    assert len(all_ideas) == 1000, f"Expected 1000 ideas, got {len(all_ideas)}"

    # Ensure src/data directory exists
    os.makedirs("src/data", exist_ok=True)

    out_path = "src/data/ideas.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_ideas, f, indent=2, ensure_ascii=False)

    print(f"Successfully saved 1000 project ideas to {out_path}!")

if __name__ == "__main__":
    main()
