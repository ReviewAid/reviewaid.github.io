    
    window.addEventListener('scroll', reveal);

    function reveal(){
        var reveals = document.querySelectorAll('.reveal');

        for(var i = 0; i < reveals.length; i++){

            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if(elementTop < windowHeight - elementVisible){
                reveals[i].classList.add('active');
            }
        }
    }

    reveal();


    const videos = document.querySelectorAll('.preview-video');
    videos.forEach(video => {
        video.playbackRate = 2.0;
    });

    
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    

    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
        }
        
        localStorage.setItem('theme', theme);
    });

  
        const citations = {
        "APA": "Sahu, V. and Balakrishnan, M. (2026) 'ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews', Journal of Open Research Software, 14(1), p. 21. Available at: https://doi.org/10.5334/jors.672 | Sahu, V. (2026) 'ReviewAid: confidence-scored, locally runnable LLM screening and extraction.' Presented at the FORRT AI in Metascience conference. https://doi.org/10.5281/zenodo.23018090",
        "Harvard": "Sahu, V. and Balakrishnan, M., 2026. ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews. Journal of Open Research Software, 14(1), p. 21. Available at: https://doi.org/10.5334/jors.672 | Sahu, V., 2026. 'ReviewAid: confidence-scored, locally runnable LLM screening and extraction.' Presented at the FORRT AI in Metascience conference. Available at: https://doi.org/10.5281/zenodo.23018090",
        "MLA": "Sahu, Vihaan, and Mohith Balakrishnan. \"ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews.\" Journal of Open Research Software, vol. 14, no. 1, 2026, p. 21, https://doi.org/10.5334/jors.672. | Sahu, Vihaan. \"ReviewAid: confidence-scored, locally runnable LLM screening and extraction.\" FORRT AI in Metascience, 2026, https://doi.org/10.5281/zenodo.23018090.",
        "Chicago": "Sahu, Vihaan, and Mohith Balakrishnan. 2026. \"ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews.\" Journal of Open Research Software 14 (1): 21. https://doi.org/10.5334/jors.672. | Sahu, Vihaan. 2026. \"ReviewAid: confidence-scored, locally runnable LLM screening and extraction.\" Paper presented at the FORRT AI in Metascience conference. https://doi.org/10.5281/zenodo.23018090.",
        "IEEE": "V. Sahu and M. Balakrishnan, \"ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews,\" Journal of Open Research Software, vol. 14, no. 1, p. 21, 2026. doi: 10.5334/jors.672. | V. Sahu, \"ReviewAid: confidence-scored, locally runnable LLM screening and extraction,\" presented at the FORRT AI in Metascience Conf., Sep. 2026. doi: 10.5281/zenodo.23018090.",
        "Vancouver": "Sahu V, Balakrishnan M. ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews. Journal of Open Research Software. 2026;14(1):21. doi:10.5334/jors.672 | Sahu V. ReviewAid: confidence-scored, locally runnable LLM screening and extraction. Presented at the FORRT AI in Metascience conference; September 2026. doi:10.5281/zenodo.23018090."
    };

    const risData = `TY  - JOUR
AU  - Sahu, V.
AU  - Balakrishnan, M.
TI  - ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews
JO  - Journal of Open Research Software
PY  - 2026
VL  - 14
IS  - 1
SP  - 21
DO  - 10.5334/jors.672
ER  -
TY  - CONF
AU  - Sahu, V.
TI  - ReviewAid: confidence-scored, locally runnable LLM screening and extraction
T2  - FORRT AI in Metascience
PY  - 2026
DO  - 10.5281/zenodo.23018090
ER  -`;

    const bibData = `@article{Sahu2026,
  author={Sahu, V. and Balakrishnan, M.},
  title={ReviewAid: An Open-Source Tool for Efficient PICO-Based Screening and Data Extraction in Systematic Reviews},
  journal={Journal of Open Research Software},
  year={2026},
  volume={14},
  number={1},
  pages={21},
  doi={10.5334/jors.672}
}

@misc{Sahu2026presentation,
  author={Sahu, V.},
  title={ReviewAid: confidence-scored, locally runnable LLM screening and extraction},
  howpublished={FORRT AI in Metascience},
  year={2026},
  doi={10.5281/zenodo.23018090}
}`;

    const styleSelector = document.getElementById('citation-style');
    const displayBox = document.getElementById('citation-display');
    const copyBtn = document.getElementById('copy-citation-btn');
    const risBtn = document.getElementById('download-ris-btn');
    const bibBtn = document.getElementById('download-bib-btn');

    function updateDisplay() {
        displayBox.textContent = citations[styleSelector.value];
    }

    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }


    if(styleSelector) {
        updateDisplay();
        styleSelector.addEventListener('change', updateDisplay);
    }

    if(copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = displayBox.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "Copied!";
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

   
    if(risBtn) {
        risBtn.addEventListener('click', () => {
            downloadFile("ReviewAid_citation.ris", risData);
        });
    }

    if(bibBtn) {
        bibBtn.addEventListener('click', () => {
            downloadFile("ReviewAid_citation.bib", bibData);
        });
    }