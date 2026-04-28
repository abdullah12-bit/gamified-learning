export const NODES = [
  {
    id: 1,
    title: 'Circuit Basics',
    subtitle: 'What makes a circuit complete?',
    zone: 'Masdar Lighting Zone',
    zoneAr: 'منطقة إضاءة مصدر',
    landmark: 'Masdar City clean-energy district',
    landmarkAr: 'مدينة مصدر للطاقة النظيفة',
    impact: 'Restore the lab’s first lighting loop',
    impactAr: 'استعادة أول حلقة إضاءة في المختبر',
    uaeLink: 'Masdar City uses efficient lighting loops across clean-energy buildings. A closed circuit is the first safety check before any showcase turns on.',
    uaeLinkAr: 'تستخدم مدينة مصدر حلقات إضاءة فعالة في مباني الطاقة النظيفة. الدائرة المغلقة هي أول فحص أمان قبل تشغيل أي عرض.',
    studentAction: 'Build',
    studentActionAr: 'ابنِ',
    guidePrompt: 'Masdar engineers start with the loop: battery, wire, bulb, and back again. No gap means power can move.',
    guidePromptAr: 'يبدأ مهندسو مصدر بفحص الحلقة: بطارية، سلك، مصباح، ثم العودة للمصدر. بلا فجوة يمكن للطاقة أن تتحرك.',
    activityGuide: 'Build the first Masdar lighting loop. Drag the wire until the bulb has a full path.',
    activityGuideAr: 'ابنِ أول حلقة إضاءة في مصدر. اسحب السلك حتى يحصل المصباح على مسار كامل.',
    titleAr: 'أساسيات الدائرة',
    subtitleAr: 'ما الذي يجعل الدائرة مكتملة؟',
    icon: '💡',
    color: '#3B82F6',
    objective: 'I can explain what a complete circuit is and why a gap stops electricity from flowing.',
    objectiveAr: 'أستطيع شرح معنى الدائرة الكهربائية المكتملة ولماذا يوقف وجود فجوة تدفق الكهرباء.',
    curriculum: 'NGSS MS-PS2: Electricity flows through closed loops; open circuits stop current.',
    reflection: {
      question: 'The Burj Khalifa has over 24,000 light fixtures. If one floor\'s lighting circuit has a gap, what happens and what type of circuit would prevent the whole floor going dark?',
      questionAr: 'يضم برج خليفة أكثر من 24,000 وحدة إضاءة. إذا وجدت فجوة في دائرة إنارة طابق واحد، ماذا يحدث؟ وأي نوع من الدوائر يمنع انطفاء الطابق بالكامل؟',
      options: ['The gap stops current — a parallel circuit keeps other lights on', 'The gap makes lights brighter — series is fine', 'Nothing happens — electricity finds another way', 'The gap only affects the battery'],
      optionsAr: ['الفجوة توقف التيار - دائرة التوازي (Parallel) تبقي المصابيح الأخرى مضاءة', 'الفجوة تجعل المصابيح أكثر سطوعاً - دائرة التوالي مناسبة', 'لا يحدث شيء - الكهرباء تجد طريقاً آخر', 'الفجوة تؤثر فقط في البطارية'],
      correct: 0,
      explanation: 'A gap breaks the circuit. Parallel wiring ensures each fixture has its own path, so one gap doesn\'t affect the rest — exactly how modern buildings like the Burj Khalifa are wired.',
      explanationAr: 'الفجوة تكسر الدائرة. التوصيل على التوازي يعطي كل مصباح مساره الخاص، لذلك لا تؤثر فجوة واحدة في البقية - وهذا يشبه طريقة توصيل المباني الحديثة مثل برج خليفة.'
    },
    lesson: {
      title: 'What Is a Circuit?',
      titleAr: 'ما هي الدائرة الكهربائية؟',
      paragraphs: [
        'A circuit is a closed loop that allows electricity to flow from a power source (like a battery), through wires and components (like a light bulb), and back to the source.',
        'If the loop is broken anywhere — a loose wire, a gap, or an open switch — the current stops and nothing works. That\'s called an open circuit.',
        'A complete, unbroken loop is called a closed circuit. Every working electrical device depends on one!'
      ],
      paragraphsAr: [
        'الدائرة الكهربائية هي مسار مغلق يسمح للكهرباء بالانتقال من مصدر طاقة مثل البطارية، عبر الأسلاك والمكونات مثل المصباح، ثم العودة إلى المصدر.',
        'إذا انقطع المسار في أي مكان - سلك مرتخٍ أو فجوة أو مفتاح مفتوح - يتوقف التيار ولا يعمل النظام. هذا يسمى دائرة مفتوحة (Open Circuit).',
        'المسار الكامل غير المنقطع يسمى دائرة مغلقة (Closed Circuit). كل جهاز كهربائي يعمل يعتمد على دائرة مغلقة.'
      ],
      keyPoint: 'Electricity needs a complete path to flow. No gaps allowed!',
      keyPointAr: 'الكهرباء تحتاج إلى مسار كامل حتى تتدفق. لا توجد فجوات!'
    },
    activity: {
      type: 'builder',
      questions: [
        {
          id: 'q1_1',
          question: 'Which of these is needed to make a circuit work?',
          questionAr: 'ما الشيء المطلوب حتى تعمل الدائرة الكهربائية؟',
          options: ['A bright light bulb', 'A complete closed loop', 'Two batteries', 'A long wire'],
          optionsAr: ['مصباح ساطع', 'حلقة مغلقة مكتملة', 'بطاريتان', 'سلك طويل'],
          correct: 1,
          hint: 'Think about what electricity needs to keep flowing without stopping.',
          hintAr: 'فكر فيما تحتاجه الكهرباء حتى تستمر في التدفق دون توقف.',
          explanation: 'Electricity needs a complete, unbroken path — a closed loop — to flow continuously.',
          explanationAr: 'الكهرباء تحتاج إلى مسار كامل غير منقطع - حلقة مغلقة - حتى تتدفق باستمرار.'
        },
        {
          id: 'q1_2',
          question: 'What happens when you disconnect a wire from a simple circuit?',
          questionAr: 'ماذا يحدث عندما تفصل سلكاً من دائرة بسيطة؟',
          options: ['The bulb gets brighter', 'Nothing changes', 'The circuit breaks and current stops', 'The battery charges up'],
          optionsAr: ['يصبح المصباح أكثر سطوعاً', 'لا يتغير شيء', 'تنكسر الدائرة ويتوقف التيار', 'تُشحن البطارية'],
          correct: 2,
          hint: 'If the path is broken, can electricity still travel?',
          hintAr: 'إذا انقطع المسار، هل تستطيع الكهرباء الاستمرار في الحركة؟',
          explanation: 'Removing a wire creates a gap (open circuit). Current cannot flow through a gap, so everything stops.',
          explanationAr: 'إزالة السلك تخلق فجوة أو دائرة مفتوحة. لا يستطيع التيار عبور الفجوة، لذلك يتوقف كل شيء.'
        },
        {
          id: 'q1_3',
          question: 'A light bulb is connected to a battery but doesn\'t light up. What\'s most likely wrong?',
          questionAr: 'مصباح متصل ببطارية لكنه لا يضيء. ما السبب الأكثر احتمالاً؟',
          options: ['The battery is too powerful', 'There\'s a gap somewhere in the circuit', 'The wire is too thick', 'Light bulbs need two batteries'],
          optionsAr: ['البطارية قوية جداً', 'توجد فجوة في مكان ما في الدائرة', 'السلك سميك جداً', 'المصابيح تحتاج إلى بطاريتين'],
          correct: 1,
          hint: 'Check if the path for electricity is complete...',
          hintAr: 'تحقق هل مسار الكهرباء مكتمل...',
          explanation: 'A gap in the circuit means it\'s "open" — electricity can\'t flow, so the bulb stays off.',
          explanationAr: 'وجود فجوة يعني أن الدائرة مفتوحة - لا تستطيع الكهرباء التدفق، لذلك يبقى المصباح مطفأ.'
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Conductors & Insulators',
    subtitle: 'Which materials let electricity through?',
    zone: 'ADNOC Safety Zone',
    zoneAr: 'منطقة أمان أدنوك',
    landmark: 'ADNOC field-safety checkpoint',
    landmarkAr: 'نقطة أمان ميدانية في أدنوك',
    impact: 'Choose safe materials for desert wiring',
    impactAr: 'اختيار مواد آمنة لأسلاك بيئة الصحراء',
    uaeLink: 'ADNOC safety teams choose conductors and insulators carefully because desert heat and field equipment leave no room for guesswork.',
    uaeLinkAr: 'تختار فرق السلامة في أدنوك الموصلات والعوازل بعناية لأن حرارة الصحراء والمعدات الميدانية لا تترك مجالاً للتخمين.',
    studentAction: 'Sort',
    studentActionAr: 'صنّف',
    guidePrompt: 'At an ADNOC safety checkpoint, the right material protects people before the power even flows.',
    guidePromptAr: 'في نقطة أمان أدنوك، اختيار المادة الصحيحة يحمي الناس قبل أن يبدأ تدفق الكهرباء.',
    activityGuide: 'Sort like a field-safety engineer: metals carry current, while rubber, plastic, glass, and wood protect people.',
    activityGuideAr: 'صنّف كمهندس سلامة ميدانية: المعادن تنقل التيار، بينما المطاط والبلاستيك والزجاج والخشب تحمي الناس.',
    titleAr: 'الموصلات والعوازل',
    subtitleAr: 'أي المواد تسمح بمرور الكهرباء؟',
    icon: '🛡️',
    color: '#F59E0B',
    objective: 'I can identify common conductors and insulators and explain why engineers choose each.',
    objectiveAr: 'أستطيع تمييز الموصلات والعوازل الشائعة وشرح لماذا يختار المهندسون كل نوع.',
    curriculum: 'NGSS MS-PS1: Properties of materials determine their use in electrical applications.',
    reflection: {
      question: 'Engineers in Masdar City (Abu Dhabi) design solar panel wiring that works in extreme desert heat. Why do they use copper wires coated in special rubber?',
      questionAr: 'يصمم مهندسو مدينة مصدر في أبوظبي أسلاك ألواح شمسية تعمل في حرارة الصحراء العالية. لماذا يستخدمون أسلاك نحاس مغطاة بمطاط خاص؟',
      options: ['Copper conducts electricity efficiently; rubber insulates and protects from heat', 'Rubber conducts better than copper in heat', 'They could use any material — it doesn\'t matter', 'Copper blocks electricity and rubber carries it'],
      optionsAr: ['النحاس يوصل الكهرباء بكفاءة؛ والمطاط يعزل ويحمي من الحرارة', 'المطاط يوصل أفضل من النحاس في الحرارة', 'يمكن استخدام أي مادة - لا يهم', 'النحاس يمنع الكهرباء والمطاط ينقلها'],
      correct: 0,
      explanation: 'Copper is an excellent conductor that carries solar energy as electricity. The rubber coating is an insulator that prevents short circuits and protects against extreme temperatures — critical in UAE desert conditions.',
      explanationAr: 'النحاس موصل ممتاز ينقل الطاقة الشمسية ككهرباء. الغلاف المطاطي عازل يمنع القصر الكهربائي ويحمي من الحرارة العالية - وهذا مهم جداً في بيئة الصحراء في الإمارات.'
    },
    lesson: {
      title: 'Conductors vs Insulators',
      titleAr: 'الموصلات والعوازل',
      paragraphs: [
        'Materials that let electricity flow through them easily are called conductors. Most metals — like copper, aluminum, and steel — are great conductors.',
        'Materials that block electricity are called insulators. Rubber, plastic, glass, and wood are common insulators. They\'re used to keep us safe from electric shock.',
        'Engineers choose the right material for each job: copper wires to carry current, and rubber coating to keep it contained safely.'
      ],
      paragraphsAr: [
        'المواد التي تسمح للكهرباء بالمرور بسهولة تسمى موصلات (Conductors). معظم المعادن مثل النحاس والألومنيوم والحديد موصلات جيدة.',
        'المواد التي تمنع مرور الكهرباء تسمى عوازل (Insulators). المطاط والبلاستيك والزجاج والخشب عوازل شائعة، وتستخدم لحمايتنا من الصدمة الكهربائية.',
        'يختار المهندسون المادة المناسبة لكل مهمة: أسلاك النحاس لنقل التيار، وطبقة المطاط لإبقائه آمناً داخل السلك.'
      ],
      keyPoint: 'Conductors carry electricity. Insulators block it. Choosing the right material matters!',
      keyPointAr: 'الموصلات تنقل الكهرباء. العوازل تمنعها. اختيار المادة الصحيحة مهم جداً!'
    },
    activity: {
      type: 'classify',
      instruction: 'Sort these materials into the correct category. Tap an item, then tap where it belongs!',
      instructionAr: 'صنّف هذه المواد في الفئة الصحيحة. اسحب العنصر أو اضغط عليه ثم اختر مكانه.',
      categories: ['Conductors', 'Insulators'],
      categoriesAr: ['موصلات (Conductors)', 'عوازل (Insulators)'],
      items: [
        { id: 'c1', label: 'Copper wire', labelAr: 'سلك نحاس', icon: '🔌', correct: 'Conductors' },
        { id: 'c2', label: 'Rubber glove', labelAr: 'قفاز مطاطي', icon: '🧤', correct: 'Insulators' },
        { id: 'c3', label: 'Aluminum foil', labelAr: 'رقائق ألومنيوم', icon: '📄', correct: 'Conductors' },
        { id: 'c4', label: 'Plastic ruler', labelAr: 'مسطرة بلاستيكية', icon: '📏', correct: 'Insulators' },
        { id: 'c5', label: 'Steel nail', labelAr: 'مسمار فولاذي', icon: '🔩', correct: 'Conductors' },
        { id: 'c6', label: 'Wooden stick', labelAr: 'عود خشبي', icon: '🪵', correct: 'Insulators' },
        { id: 'c7', label: 'Gold ring', labelAr: 'خاتم ذهبي', icon: '💍', correct: 'Conductors' },
        { id: 'c8', label: 'Glass rod', labelAr: 'قضيب زجاجي', icon: '🧪', correct: 'Insulators' }
      ]
    }
  },
  {
    id: 3,
    title: 'Series vs Parallel',
    subtitle: 'Two ways to connect a circuit',
    zone: 'Dubai Metro Power Grid',
    zoneAr: 'شبكة طاقة مترو دبي',
    landmark: 'Dubai Metro reliability network',
    landmarkAr: 'شبكة موثوقية مترو دبي',
    impact: 'Keep safety lights running independently',
    impactAr: 'إبقاء أضواء السلامة تعمل باستقلالية',
    uaeLink: 'Dubai Metro stations rely on dependable lighting paths, so one failed lamp should not darken the whole platform.',
    uaeLinkAr: 'تعتمد محطات مترو دبي على مسارات إضاءة موثوقة، لذلك لا ينبغي أن يطفئ مصباح واحد المنصة كلها.',
    studentAction: 'Test',
    studentActionAr: 'اختبر',
    guidePrompt: 'Dubai Metro systems need lights that stay on independently. Watch how the path changes the result.',
    guidePromptAr: 'تحتاج أنظمة مترو دبي إلى أضواء تعمل باستقلالية. لاحظ كيف يغير المسار النتيجة.',
    activityGuide: 'Test series, then parallel. Your goal is a Metro-safe setup where one bulb does not shut down every light.',
    activityGuideAr: 'اختبر التوالي ثم التوازي. هدفك إعداد آمن للمترو لا يطفئ فيه مصباح واحد كل الأضواء.',
    titleAr: 'التوالي مقابل التوازي',
    subtitleAr: 'طريقتان لتوصيل الدائرة',
    icon: '⚡',
    color: '#8B5CF6',
    objective: 'I can compare series and parallel circuits and choose the right setup for a given situation.',
    objectiveAr: 'أستطيع مقارنة دوائر التوالي والتوازي واختيار التوصيل المناسب لكل موقف.',
    curriculum: 'NGSS MS-PS2: Series circuits have one path; parallel circuits have multiple independent paths.',
    reflection: {
      question: 'Dubai Metro stations use thousands of safety lights. If one light fails, the others must stay on. Which circuit type should engineers use and why?',
      questionAr: 'تستخدم محطات مترو دبي آلاف أضواء السلامة. إذا تعطل مصباح واحد، يجب أن تبقى المصابيح الأخرى مضاءة. أي نوع دائرة يجب أن يستخدمه المهندسون؟ ولماذا؟',
      options: ['Parallel — each light has its own path so others stay on', 'Series — it\'s simpler and cheaper to install', 'Either works the same for safety lights', 'Series — because one path is more reliable'],
      optionsAr: ['التوازي (Parallel) - لكل مصباح مساره الخاص فتظل المصابيح الأخرى تعمل', 'التوالي (Series) - أبسط وأرخص في التركيب', 'كلاهما يعمل بالطريقة نفسها لأضواء السلامة', 'التوالي - لأن المسار الواحد أكثر موثوقية'],
      correct: 0,
      explanation: 'Parallel circuits give each safety light its own path. If one fails, current still flows to the rest — essential for public safety in busy transit systems like Dubai Metro.',
      explanationAr: 'دوائر التوازي تعطي كل ضوء سلامة مساره الخاص. إذا تعطل واحد، يستمر التيار في الوصول إلى البقية - وهذا ضروري للسلامة في أنظمة نقل مزدحمة مثل مترو دبي.'
    },
    lesson: {
      title: 'Series & Parallel Circuits',
      titleAr: 'دوائر التوالي والتوازي',
      paragraphs: [
        'In a series circuit, all components are connected in a single loop, one after another. If one part breaks, the whole circuit stops — just like old holiday lights!',
        'In a parallel circuit, each component has its own separate path. If one part breaks, the others keep working — like the lights in different rooms of your house.',
        'Parallel circuits are used in most buildings because they\'re more reliable. Series circuits are simpler but riskier for important systems.'
      ],
      paragraphsAr: [
        'في دائرة التوالي (Series)، تتصل كل المكونات في حلقة واحدة، واحداً بعد الآخر. إذا تعطل جزء واحد تتوقف الدائرة كلها، مثل بعض أضواء الزينة القديمة.',
        'في دائرة التوازي (Parallel)، يمتلك كل مكون مساره الخاص. إذا تعطل جزء واحد، تستمر الأجزاء الأخرى في العمل مثل أضواء الغرف المختلفة في المنزل.',
        'تستخدم دوائر التوازي في معظم المباني لأنها أكثر موثوقية. دوائر التوالي أبسط، لكنها أكثر خطورة للأنظمة المهمة.'
      ],
      keyPoint: 'Series = one path, all or nothing. Parallel = multiple paths, more reliable.',
      keyPointAr: 'التوالي = مسار واحد، الكل يعمل أو الكل يتوقف. التوازي = مسارات متعددة وأكثر موثوقية.'
    },
    activity: {
      type: 'lab',
      questions: [
        {
          id: 'q3_1',
          question: 'In a series circuit with 3 bulbs, one bulb burns out. What happens?',
          questionAr: 'في دائرة توالي فيها 3 مصابيح، تعطل مصباح واحد. ماذا يحدث؟',
          options: ['Only that bulb goes off', 'All bulbs go off', 'The other bulbs get brighter', 'Nothing changes'],
          optionsAr: ['ينطفئ ذلك المصباح فقط', 'تنطفئ كل المصابيح', 'تصبح المصابيح الأخرى أكثر سطوعاً', 'لا يتغير شيء'],
          correct: 1,
          hint: 'In series, there\'s only ONE path for electricity...',
          hintAr: 'في التوالي يوجد مسار واحد فقط للكهرباء...',
          explanation: 'In a series circuit, all components share one path. If one breaks, the loop is broken and everything stops.',
          explanationAr: 'في دائرة التوالي، تشترك كل المكونات في مسار واحد. إذا انكسر جزء واحد، تنكسر الحلقة ويتوقف كل شيء.'
        },
        {
          id: 'q3_2',
          question: 'Your house has lights in different rooms that work independently. What type of circuit is used?',
          questionAr: 'في منزلك مصابيح في غرف مختلفة تعمل بشكل مستقل. أي نوع دائرة مستخدم؟',
          options: ['Series circuit', 'Parallel circuit', 'Open circuit', 'Broken circuit'],
          optionsAr: ['دائرة توالي (Series)', 'دائرة توازي (Parallel)', 'دائرة مفتوحة', 'دائرة مكسورة'],
          correct: 1,
          hint: 'Each room light works on its own, even if another is switched off...',
          hintAr: 'مصباح كل غرفة يعمل وحده حتى لو أطفأت مصباحاً آخر...',
          explanation: 'Parallel circuits give each component its own path, so they work independently of each other.',
          explanationAr: 'دوائر التوازي تعطي كل مكون مساره الخاص، لذلك تعمل المكونات بشكل مستقل.'
        },
        {
          id: 'q3_3',
          question: 'Which circuit type is better for holiday lights if you want one broken bulb to NOT affect the others?',
          questionAr: 'أي نوع دائرة أفضل لأضواء الزينة إذا أردت ألا يؤثر تعطل مصباح واحد في البقية؟',
          options: ['Series', 'Parallel', 'Both work the same', 'Neither works'],
          optionsAr: ['توالي (Series)', 'توازي (Parallel)', 'كلاهما يعمل بالطريقة نفسها', 'لا يعمل أي منهما'],
          correct: 1,
          hint: 'You want each bulb to have its own path...',
          hintAr: 'تريد أن يكون لكل مصباح مساره الخاص...',
          explanation: 'Parallel circuits let each bulb work independently. Modern holiday lights use parallel wiring for this reason!',
          explanationAr: 'دوائر التوازي تجعل كل مصباح يعمل بشكل مستقل. لهذا تستخدم أضواء الزينة الحديثة التوصيل على التوازي.'
        }
      ]
    }
  },
  {
    id: 4,
    title: 'Repair Challenge',
    subtitle: 'Fix the broken lab systems',
    zone: 'Jebel Ali Engineering Bay',
    zoneAr: 'خليج هندسة جبل علي',
    landmark: 'Jebel Ali engineering operations bay',
    landmarkAr: 'منطقة عمليات هندسية في جبل علي',
    impact: 'Diagnose and repair failed lab systems',
    impactAr: 'تشخيص وإصلاح أنظمة المختبر المتعطلة',
    uaeLink: 'Jebel Ali operations depend on engineers who diagnose faults step by step before restarting critical equipment.',
    uaeLinkAr: 'تعتمد عمليات جبل علي على مهندسين يشخصون الأعطال خطوة بخطوة قبل إعادة تشغيل المعدات المهمة.',
    studentAction: 'Repair',
    studentActionAr: 'أصلح',
    guidePrompt: 'Jebel Ali engineers do not rush a restart. They find one fault, prove it, then fix it.',
    guidePromptAr: 'مهندسو جبل علي لا يتسرعون في إعادة التشغيل. يجدون عطلاً واحداً، يتحققون منه، ثم يصلحونه.',
    activityGuide: 'Repair like an operations engineer: close the gap, replace the bad material, then improve the wiring.',
    activityGuideAr: 'أصلح كمهندس عمليات: أغلق الفجوة، استبدل المادة الخاطئة، ثم حسّن التوصيل.',
    titleAr: 'تحدي الإصلاح',
    subtitleAr: 'أصلح أنظمة المختبر المعطلة',
    icon: '🔧',
    color: '#EF4444',
    objective: 'I can diagnose common circuit faults and apply the correct fix for each one.',
    objectiveAr: 'أستطيع تشخيص أعطال الدوائر الشائعة وتطبيق الإصلاح الصحيح لكل عطل.',
    curriculum: 'NGSS MS-ETS1: Troubleshooting involves systematic testing and evidence-based fixes.',
    reflection: {
      question: 'A technician at ADNOC\'s control center finds that safety sensors keep failing together. What is the most likely wiring problem and fix?',
      questionAr: 'اكتشف فني في مركز تحكم أدنوك أن حساسات السلامة تتعطل معاً. ما مشكلة التوصيل الأكثر احتمالاً وما الحل؟',
      options: ['They\'re wired in series — switching to parallel keeps others running', 'They need bigger batteries', 'The sensors are too old to work', 'Adding more series connections will help'],
      optionsAr: ['موصلة على التوالي - التحويل إلى التوازي يبقي الحساسات الأخرى تعمل', 'تحتاج إلى بطاريات أكبر', 'الحساسات قديمة جداً ولا تعمل', 'إضافة توصيلات توالي أكثر سيساعد'],
      correct: 0,
      explanation: 'If sensors fail together, they\'re likely in series (one path). Rewiring to parallel gives each sensor independence — a standard engineering practice in critical UAE infrastructure.',
      explanationAr: 'إذا تعطلت الحساسات معاً، فهي غالباً موصلة على التوالي في مسار واحد. إعادة توصيلها على التوازي تعطي كل حساس استقلالية - وهذا إجراء هندسي مهم في البنية التحتية الحيوية في الإمارات.'
    },
    lesson: {
      title: 'Troubleshooting Circuits',
      titleAr: 'استكشاف أعطال الدوائر',
      paragraphs: [
        'Real engineers don\'t just build circuits — they fix them too! Troubleshooting means finding and solving problems in a circuit.',
        'Common problems include: broken wires (gaps in the circuit), wrong materials used (insulators where conductors should be), and incorrect wiring setups.',
        'To fix a circuit, you check each part step by step: Is the path complete? Are the right materials used? Is the setup correct for the job?'
      ],
      paragraphsAr: [
        'المهندسون الحقيقيون لا يبنون الدوائر فقط، بل يصلحونها أيضاً. استكشاف الأعطال يعني العثور على المشكلة وحلها داخل الدائرة.',
        'تشمل المشكلات الشائعة: أسلاك مكسورة أو فجوات في الدائرة، استخدام مواد خاطئة مثل عازل بدل موصل، أو إعداد توصيل غير مناسب.',
        'لإصلاح دائرة، افحص كل جزء خطوة بخطوة: هل المسار مكتمل؟ هل المواد صحيحة؟ هل طريقة التوصيل مناسبة للمهمة؟'
      ],
      keyPoint: 'Think like an engineer: check the path, the materials, and the setup!',
      keyPointAr: 'فكر كمهندس: افحص المسار، والمواد، وطريقة التوصيل.'
    },
    activity: {
      type: 'repair',
      scenario: 'The Innovation Lab\'s Engineering Bay has gone dark! The circuit powering the equipment has 3 faults. Find and fix each one to restore power.',
      scenarioAr: 'انطفأت منطقة الهندسة في مختبر الابتكار! الدائرة التي تشغل المعدات فيها 3 أعطال. ابحث عنها وأصلحها لإعادة الطاقة.',
      faults: [
        {
          id: 'f1',
          type: 'gap',
          label: 'Broken Wire',
          labelAr: 'سلك مقطوع',
          description: 'There\'s a gap in the circuit wire. No current can flow!',
          descriptionAr: 'توجد فجوة في سلك الدائرة. لا يستطيع التيار التدفق!',
          hint: 'Look for a break in the wire path.',
          hintAr: 'ابحث عن انقطاع في مسار السلك.',
          fixLabel: 'Connect the wire',
          fixLabelAr: 'وصل السلك',
          explanation: 'A complete path is needed for current to flow. Connecting the broken wire closes the circuit.',
          explanationAr: 'يحتاج التيار إلى مسار كامل حتى يتدفق. توصيل السلك المقطوع يغلق الدائرة.'
        },
        {
          id: 'f2',
          type: 'material',
          label: 'Wrong Material',
          labelAr: 'مادة خاطئة',
          description: 'Someone used a rubber connector instead of a metal one!',
          descriptionAr: 'استخدم شخص ما وصلة مطاطية بدلاً من وصلة معدنية!',
          hint: 'Rubber is an insulator — it blocks electricity.',
          hintAr: 'المطاط عازل - يمنع مرور الكهرباء.',
          fixLabel: 'Swap to copper',
          fixLabelAr: 'استبدلها بالنحاس',
          explanation: 'Rubber is an insulator and blocks current. Replacing it with copper (a conductor) lets electricity flow again.',
          explanationAr: 'المطاط عازل ويمنع التيار. استبداله بالنحاس، وهو موصل، يسمح للكهرباء بالتدفق مرة أخرى.'
        },
        {
          id: 'f3',
          type: 'wiring',
          label: 'Wrong Setup',
          labelAr: 'توصيل خاطئ',
          description: 'Critical systems are wired in series — one failure takes everything down!',
          descriptionAr: 'الأنظمة المهمة موصلة على التوالي - تعطل واحد يوقف كل شيء!',
          hint: 'Which circuit type lets components work independently?',
          hintAr: 'أي نوع دائرة يسمح للمكونات بالعمل بشكل مستقل؟',
          fixLabel: 'Switch to parallel',
          fixLabelAr: 'حوّل إلى التوازي',
          explanation: 'Parallel wiring ensures that if one component fails, the others keep working — essential for critical lab systems.',
          explanationAr: 'التوصيل على التوازي يضمن أن المكونات الأخرى تستمر في العمل إذا تعطل مكون واحد - وهذا ضروري لأنظمة المختبر المهمة.'
        }
      ]
    }
  },
  {
    id: 5,
    title: 'Final Mission',
    subtitle: 'Restore full power to the lab',
    zone: 'Barakah Control Room',
    zoneAr: 'غرفة تحكم براكة',
    landmark: 'Barakah-inspired control room',
    landmarkAr: 'غرفة تحكم مستوحاة من براكة',
    impact: 'Bring the full UAE energy lab online',
    impactAr: 'إعادة مختبر الطاقة الإماراتي بالكامل للعمل',
    uaeLink: 'Barakah-inspired control rooms depend on calm checks, reliable wiring, and evidence before full power is restored.',
    uaeLinkAr: 'تعتمد غرف التحكم المستوحاة من براكة على فحوص هادئة وتوصيل موثوق ودليل واضح قبل استعادة الطاقة بالكامل.',
    studentAction: 'Launch',
    studentActionAr: 'شغّل',
    guidePrompt: 'Barakah control-room thinking is calm and careful: check the path, the material, and the wiring before launch.',
    guidePromptAr: 'تفكير غرفة تحكم براكة هادئ ودقيق: افحص المسار والمادة والتوصيل قبل التشغيل.',
    activityGuide: 'Launch the final restoration. Check paths, materials, and reliable parallel wiring.',
    activityGuideAr: 'شغّل الاستعادة النهائية. افحص المسارات والمواد والتوصيل المتوازي الموثوق.',
    titleAr: 'المهمة النهائية',
    subtitleAr: 'أعد الطاقة الكاملة إلى المختبر',
    icon: '🚀',
    color: '#00D4AA',
    objective: 'I can apply all my electricity knowledge to restore a complex system safely.',
    objectiveAr: 'أستطيع تطبيق معرفتي بالكهرباء لإعادة تشغيل نظام معقد بأمان.',
    curriculum: 'NGSS MS-ETS1 + MS-PS2: Integrating circuit, material, and design knowledge to solve real problems.',
    reflection: {
      question: 'You\'ve restored the Innovation Lab! If you were advising a new UAE smart building project, what three things would you check in every electrical system?',
      questionAr: 'لقد أعدت تشغيل مختبر الابتكار! إذا كنت تقدم نصيحة لمشروع مبنى ذكي جديد في الإمارات، ما الأشياء الثلاثة التي ستفحصها في كل نظام كهربائي؟',
      options: ['Complete paths (no gaps), correct materials (conductors/insulators), and parallel wiring for critical systems', 'Just make sure the batteries are big enough', 'Only check that wires are long enough', 'Use series wiring everywhere for simplicity'],
      optionsAr: ['مسارات كاملة بلا فجوات، مواد صحيحة (موصلات/عوازل)، وتوصيل توازي للأنظمة المهمة', 'التأكد فقط أن البطاريات كبيرة بما يكفي', 'فحص طول الأسلاك فقط', 'استخدام التوالي في كل مكان لأنه أبسط'],
      correct: 0,
      explanation: 'A safe electrical system needs: (1) complete circuit paths, (2) proper conductor/insulator materials, and (3) parallel wiring for reliability. These are the three pillars you\'ve mastered!',
      explanationAr: 'النظام الكهربائي الآمن يحتاج إلى: (1) مسارات دائرة كاملة، (2) مواد موصلة وعازلة مناسبة، و(3) توصيل توازي للموثوقية. هذه هي الركائز الثلاث التي أتقنتها.'
    },
    lesson: {
      title: 'Power Restoration Protocol',
      titleAr: 'بروتوكول استعادة الطاقة',
      paragraphs: [
        'You\'ve learned about complete circuits, conductors and insulators, series and parallel setups, and how to troubleshoot problems.',
        'Now it\'s time to put it all together. The Control Room needs full power restored — and you\'re the engineer in charge!',
        'Answer the final set of questions to bring every system online. Use everything you\'ve learned. You\'ve got this!'
      ],
      paragraphsAr: [
        'تعلمت عن الدوائر المكتملة، والموصلات والعوازل، والتوالي والتوازي، وكيفية استكشاف الأعطال.',
        'الآن حان وقت استخدام كل ذلك معاً. غرفة التحكم تحتاج إلى استعادة الطاقة بالكامل، وأنت المهندس المسؤول.',
        'أجب عن مجموعة الأسئلة النهائية لتشغيل كل نظام. استخدم كل ما تعلمته. أنت قادر على ذلك.'
      ],
      keyPoint: 'Combine all your knowledge — circuits, materials, and wiring — to complete the mission!',
      keyPointAr: 'اجمع معرفتك بالدوائر والمواد والتوصيل لإكمال المهمة.'
    },
    activity: {
      type: 'final',
      timeLimit: 90,
      questions: [
        {
          id: 'q5_1',
          question: 'The emergency lights won\'t turn on. The wire path looks complete, but the connector is made of glass. What should you do?',
          questionAr: 'أضواء الطوارئ لا تعمل. يبدو مسار الأسلاك كاملاً، لكن الوصلة مصنوعة من الزجاج. ماذا يجب أن تفعل؟',
          options: ['Add more batteries', 'Replace the glass connector with a metal one', 'Remove the lights', 'Add another glass connector'],
          optionsAr: ['إضافة بطاريات أكثر', 'استبدال الوصلة الزجاجية بوصلة معدنية', 'إزالة الأضواء', 'إضافة وصلة زجاجية أخرى'],
          correct: 1,
          explanation: 'Glass is an insulator. Replacing it with a metal conductor will let current flow to the lights.',
          explanationAr: 'الزجاج عازل. استبداله بموصل معدني يسمح للتيار بالوصول إلى الأضواء.'
        },
        {
          id: 'q5_2',
          question: 'The lab has 5 critical computer stations. If one fails, the others must keep running. How should they be wired?',
          questionAr: 'في المختبر 5 محطات حاسوب مهمة. إذا تعطلت واحدة، يجب أن تستمر البقية في العمل. كيف يجب توصيلها؟',
          options: ['In series', 'In parallel', 'With no circuit', 'Alternating series and parallel'],
          optionsAr: ['على التوالي (Series)', 'على التوازي (Parallel)', 'بدون دائرة', 'بالتناوب بين التوالي والتوازي'],
          correct: 1,
          explanation: 'Parallel wiring gives each station its own path, so one failure doesn\'t affect the others.',
          explanationAr: 'التوصيل على التوازي يعطي كل محطة مسارها الخاص، لذلك لا يؤثر تعطل محطة واحدة في البقية.'
        },
        {
          id: 'q5_3',
          question: 'An engineer notices that a safety sensor stops working when another sensor in the same circuit fails. What type of circuit are they using?',
          questionAr: 'لاحظ مهندس أن حساس سلامة يتوقف عن العمل عندما يتعطل حساس آخر في الدائرة نفسها. ما نوع الدائرة المستخدمة؟',
          options: ['Parallel circuit', 'Series circuit', 'Open circuit', 'Complete circuit'],
          optionsAr: ['دائرة توازي (Parallel)', 'دائرة توالي (Series)', 'دائرة مفتوحة', 'دائرة مكتملة'],
          correct: 1,
          explanation: 'In a series circuit, if one component fails, the entire circuit breaks. That\'s why one sensor failing affects the other.',
          explanationAr: 'في دائرة التوالي، إذا تعطل مكون واحد تنكسر الدائرة بالكامل. لذلك يؤثر تعطل حساس واحد في الآخر.'
        },
        {
          id: 'q5_4',
          question: 'Which of these would be the WORST choice for electrical wiring insulation?',
          questionAr: 'أي من هذه المواد سيكون أسوأ اختيار لعزل الأسلاك الكهربائية؟',
          options: ['Rubber', 'Plastic', 'Aluminum', 'Ceramic'],
          optionsAr: ['مطاط', 'بلاستيك', 'ألومنيوم', 'سيراميك'],
          correct: 2,
          explanation: 'Aluminum is a metal conductor — it would let electricity escape instead of containing it safely.',
          explanationAr: 'الألومنيوم معدن موصل، لذلك سيسمح للكهرباء بالخروج بدلاً من احتوائها بأمان.'
        },
        {
          id: 'q5_5',
          question: 'To restore full power, you need a closed circuit with copper wires, connected in parallel. Which problem below would STILL prevent power from flowing?',
          questionAr: 'لاستعادة الطاقة بالكامل تحتاج إلى دائرة مغلقة بأسلاك نحاس موصلة على التوازي. أي مشكلة مما يلي ستظل تمنع تدفق الطاقة؟',
          options: ['The wires are very long', 'There\'s a switch in the off position', 'The circuit uses parallel wiring', 'The wires are made of copper'],
          optionsAr: ['الأسلاك طويلة جداً', 'يوجد مفتاح في وضع الإيقاف', 'الدائرة تستخدم توصيل التوازي', 'الأسلاك مصنوعة من النحاس'],
          correct: 1,
          explanation: 'An open switch creates a gap in the circuit. Even with perfect wiring and materials, the circuit must be closed for current to flow.',
          explanationAr: 'المفتاح المفتوح يخلق فجوة في الدائرة. حتى مع الأسلاك والمواد المناسبة، يجب أن تكون الدائرة مغلقة حتى يتدفق التيار.'
        }
      ]
    }
  }
];

export const GUIDE_MESSAGES = {
  welcome: "Hi, I'm Zap. Today you're restoring a UAE Future Energy Lab, one real-world system at a time.",
  story: "The clean-energy showcase is about to start. We'll bring the five UAE energy zones back online step by step.",
  map: "Pick the next UAE energy stop. Green means ready, gold means mastered, and locked zones open as you restore power.",
  lesson: "Read the mission card, then connect the science to the UAE system you're repairing.",
  quiz: "Take your time. Engineers check evidence before they choose an answer.",
  classify: "Sort each material like a safety engineer: what carries current, and what protects people?",
  repair: "Find one fault at a time. Diagnose first, then repair like a Jebel Ali operations engineer.",
  final: "Final control-room check: use circuits, materials, and reliable wiring together.",
  reflection: "Real-world check: connect your answer to the UAE system you just restored.",
  correct: "Strong engineering choice. That keeps the mission moving.",
  incorrect: "Not quite yet. Use the hint, then test your thinking again.",
  nodeComplete: "Zone restored. Another UAE energy system is back online.",
  allComplete: "Full power restored. The UAE Future Energy Lab is ready for the showcase."
};

export const GUIDE_MESSAGES_AR = {
  welcome: "مرحباً، أنا زاب. ستعيد اليوم تشغيل مختبر طاقة إماراتي، نظاماً واقعياً بعد آخر.",
  story: "عرض الطاقة النظيفة على وشك البدء. سنعيد مناطق الطاقة الإماراتية الخمس إلى العمل خطوة بخطوة.",
  map: "اختر محطة الطاقة الإماراتية التالية. الأخضر جاهز، والذهبي متقن، والمناطق المغلقة تُفتح مع تقدمك.",
  lesson: "اقرأ بطاقة المهمة، ثم اربط الفكرة العلمية بالنظام الإماراتي الذي تصلحه.",
  quiz: "خذ وقتك. المهندسون يفحصون الدليل قبل اختيار الإجابة.",
  classify: "صنّف كل مادة كمهندس سلامة: ما الذي ينقل التيار، وما الذي يحمي الناس؟",
  repair: "ابحث عن عطل واحد في كل مرة. شخّص أولاً، ثم أصلح كمهندس عمليات في جبل علي.",
  final: "فحص غرفة التحكم النهائي: استخدم الدوائر والمواد والتوصيل الموثوق معاً.",
  reflection: "فحص واقعي: اربط إجابتك بالنظام الإماراتي الذي أعدته إلى العمل.",
  correct: "اختيار هندسي قوي. هذا يدفع المهمة إلى الأمام.",
  incorrect: "ليست تماماً بعد. استخدم التلميح ثم اختبر تفكيرك مرة أخرى.",
  nodeComplete: "تمت استعادة المنطقة. عاد نظام طاقة إماراتي آخر إلى العمل.",
  allComplete: "تمت استعادة الطاقة بالكامل. مختبر الطاقة المستقبلي في الإمارات جاهز للعرض."
};

export const BADGES = [
  { id: 'circuit_starter', label: 'Masdar Circuit Starter', labelAr: 'مبتدئ دوائر مصدر', icon: '💡', description: 'Built the first clean-energy lighting loop', descriptionAr: 'بنى أول حلقة إضاءة للطاقة النظيفة' },
  { id: 'safety_expert', label: 'ADNOC Safety Checker', labelAr: 'فاحص سلامة أدنوك', icon: '🛡️', description: 'Sorted safe conductors and insulators', descriptionAr: 'صنّف الموصلات والعوازل الآمنة' },
  { id: 'power_planner', label: 'Dubai Metro Power Planner', labelAr: 'مخطط طاقة مترو دبي', icon: '⚡', description: 'Planned reliable parallel lighting paths', descriptionAr: 'خطط مسارات إضاءة متوازية موثوقة' },
  { id: 'lab_engineer', label: 'Jebel Ali Troubleshooter', labelAr: 'مشخّص أعطال جبل علي', icon: '🔧', description: 'Repaired the engineering bay systems', descriptionAr: 'أصلح أنظمة منطقة الهندسة' },
  { id: 'mission_commander', label: 'Barakah Control Engineer', labelAr: 'مهندس تحكم براكة', icon: '🚀', description: 'Restored full power to the UAE energy lab', descriptionAr: 'أعاد الطاقة الكاملة إلى مختبر الطاقة الإماراتي' }
];
