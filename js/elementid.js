"use strict"

let currentElementName = {
    first: '',
    second: ''
};


// checks if html element currentlly displaying on client screen
const isElementInView = (el, ratio) => {
    if (el instanceof Element) {
        const indexY = window.pageYOffset
        const viewport = {
            top: indexY,
            bottom: indexY + window.innerHeight
        }
        const EboundsTop = el.getBoundingClientRect().top + indexY
        const ElementBounds = {
            top: EboundsTop,
            bottom: EboundsTop + el.clientHeight
        }

        if ((ElementBounds.bottom >= viewport.top && ElementBounds.bottom * ratio <= viewport.bottom) ||
            (ElementBounds.top <= viewport.bottom * ratio && ElementBounds.top >= viewport.top)) {
            return true;
        }
        else
            return false;
    }
}

const createskillsObject = (skillArr) => {
    if (skillArr.length >= 0) {
        const skillObj = {
            set: [{ skillId: document.getElementById(skillArr[0].skillId), skillScore: skillArr[0].score, progressId: document.getElementById(skillArr[0].progressId) }]
        }

        for (let i = 1; i < skillArr.length; i++) {

            skillObj.set.push({ skillId: document.getElementById(skillArr[i].skillId), skillScore: skillArr[i].score, progressId: document.getElementById(skillArr[i].progressId) })
        }
        return skillObj.set;
    }
    else return null;
}

//get element ID and update rate = total time in mil seconds to complete animation
const animatedElement = (elSection, secTwo) => {
    switch (elSection.id) {
        case 'sectionOne':

            break;
        case 'sectionTwo':
            function move(objElem,transparency) {
                var width = 0;
                var id = setInterval(frame, 90);
                var green = 104;
                function frame() {
                    if (width >= objElem.skillScore) {
                        clearInterval(id);
                        if (objElem.skillScore >= 90)
                        objElem.skillId.style.backgroundColor = "rgb(241, 104,12," + 1 + ")";
                    } else {
                        transparency += 0.035;
                        width += 5;
                        objElem.skillId.style.backgroundColor = "rgb(241, 104," + (green--) + "," + transparency + ")";
                        objElem.skillId.style.width = width + '%';
                        objElem.skillId.setAttribute('ariaValuenow', width);
                        objElem.progressId.innerHTML = width + '%';

                    }
                }
            }

            for (const key in secTwo) {
                move(secTwo[key], 0.2);
            }

            break;
        case 'sectionThree':

            break;
        case 'sectionFour':

            break;
        default:
            break;
    }


}



// Usage.
document.addEventListener('DOMContentLoaded', () => {
    
    class rowSkill {
        //set and update in html doc the new row elements
        constructor(_skillName, _score) {
            this.skillText = _skillName;
            this.skillId = this.createSkillId();
            this.score = _score;
            this.progressId = this.skillId + 'T'
            this.newStrEl = `<div class="row rowProgress">
                                <span class="col-l-3 col-xl-3 spanProgress">
                                 <h5 class="hFive hFive-color">skillText</h5>
                                </span>
                                <div class="progress ProgressColor col-10 col-l-6 col-xl-6">
                                <div id="skillId" class="progress-bar progressBar-layout progress-bar-striped progress-bar-animated " role="progressbar"
                                    aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
                                </div>
                                <h3 id="progressId" class="hThree hThree-color col-2 col-l-1 col-xl-1">0%</h3>
                            </div>`;
    
            this.temp1 = this.newStrEl.replace('skillText', this.skillText);
            this.newStrEl = this.temp1.replace('skillId', this.skillId);
            this.temp1 = this.newStrEl.replace('progressId', this.progressId);
            this.newStrEl = document.getElementById("containerProgress").innerHTML + this.temp1;
            document.getElementById("containerProgress").innerHTML = this.newStrEl;
            this.newStrEl = '';
            this.temp1 = '';
    
        }
        createSkillId() {
            let temp = this.skillText.toLowerCase();
            let temp1 = temp.replace(/ /g, '');
            let skillId = temp1.replace(/[.,';:`£%&~=!--/]/g, '');
            return skillId;
        }
    
    }
    
    const skillRows = [
        new rowSkill('Bootstrap', 85), new rowSkill('JavaScript', 90),
        new rowSkill('ES6', 90), new rowSkill('TS', 95), new rowSkill('Angular 6', 85),
        new rowSkill('C#', 95), new rowSkill('MySql / MsSql', 95),
        new rowSkill('ASP.NET / Web API', 75)
    ];
    
    
    const skill = createskillsObject(skillRows);
    
    
    
    let SectionId = [
        [document.getElementById('sectionOne'), 1],
        [document.getElementById('sectionTwo'), 1],
        [document.getElementById('sectionThree'), 1],
        [document.getElementById('sectionFour'), 1]
    ]
    

    const handler = () => {
        currentElementName.first = '';
        currentElementName.second = '';
        for (var i = 0; i < SectionId.length; i++) {
            if (SectionId[i][1] && isElementInView(SectionId[i][0], 0.5)) {
                currentElementName.first = String(SectionId[i][0].id)
                SectionId[i][1] = 0;
                animatedElement(SectionId[i][0], skill);
                if (i + 1 < SectionId.length && isElementInView(SectionId[i + 1][0], 0.3)) {
                    currentElementName.second = String(SectionId[i + 1][0].id)
                    SectionId[i + 1][1] = 0;
                    animatedElement(SectionId[i + 1][0], skill);
                }
                break;
            }
        }
    }

    window.addEventListener('scroll', handler)
})


