"use strict"

let currentElementName = {
    first: '',
    second: ''
};



// checks if html element currentlly displaying on client screen
const isElementInView = (el) => {
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

        if ((ElementBounds.bottom >= viewport.top && ElementBounds.bottom <= viewport.bottom) ||
            (ElementBounds.top <= viewport.bottom && ElementBounds.top >= viewport.top) ||
            (ElementBounds.bottom >= viewport.bottom && ElementBounds.top <= viewport.top)) {
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

//handle dynamic background offset per section seperatlly if currentlly display on screen
//handle dynamic bar progress 
const animatedElement = (elSection, progressBarInd, secTwo, yScroll) => {

    function sectionBackgroundOffset(secElement, yScroll, parallaxSpeed) {

        secElement.style.transform = "translate3d(" + 0 + ", " + yScroll * parallaxSpeed / 2.5 + "px, 0";

    }


    function rotateAnimation(elSection, yScroll) {
        switch (elSection.id) {
            case 'sectionTwo':
                document.getElementById("secTwoInd").style.transform = "rotateY(" + yScroll * 0.45 + "deg)"
                break;
            case 'sectionThree':
                document.getElementById("secThreeInd").style.transform = "rotateY(" + yScroll * 0.45 + "deg)"
                break;

            default:
                break;
        }
    }


    switch (elSection.id) {
        case 'sectionOne':
            sectionBackgroundOffset(elSection, yScroll, 0.2);
            return true;

        case 'sectionTwo':
            rotateAnimation(elSection, yScroll);
            sectionBackgroundOffset(elSection, yScroll, 0.1);
            function move(objElem, transparency) {
                var width = 0;
                var id = setInterval(frame, 50);
                var green = 104;
                function frame() {
                    if (width >= objElem.skillScore) {
                        clearInterval(id);
                        if (objElem.skillScore >= 90)
                            objElem.skillId.style.backgroundColor = "rgb(241, 104,12," + 1 + ")";
                    } else {
                        transparency += 0.006;
                        width += 1;
                        objElem.skillId.style.backgroundColor = "rgb(241, 104," + (green--) + "," + transparency + ")";
                        objElem.skillId.style.width = width + '%';
                        objElem.skillId.setAttribute('ariaValuenow', width);
                        objElem.progressId.innerHTML = width + '%';

                    }
                }
            }
            if (progressBarInd && elSection.getBoundingClientRect().top / window.innerHeight < 0.5) {
                for (const key in secTwo) {
                    move(secTwo[key], 0.2);
                }
                return true;
            }
            else return false;

        case 'sectionThree':
            rotateAnimation(elSection, yScroll);
            sectionBackgroundOffset(elSection, yScroll, 0.08);

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
        //set and update in html doc the new row elements, generate html Id's acordinglly to skill name
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
        new rowSkill('NodeJS', 99), new rowSkill('C#', 95), new rowSkill('MySql / MsSql', 95),
        new rowSkill('ASP.NET / Web API', 75)
    ];


    const skill = createskillsObject(skillRows);


    const SectionEl = [
        document.getElementById('sectionOne'),
        document.getElementById('sectionTwo'),
        document.getElementById('sectionThree'),
        document.getElementById('sectionFour')
    ]


    let sectionRule = [
        [SectionEl[0], true, 'o'],
        [SectionEl[1], true, 'o'],
        [SectionEl[2], true, 'o'],
        [SectionEl[3], true, 'r']
    ]


    const handler = () => {
        let scrollingY = window.scrollY;
        currentElementName.first = '';
        currentElementName.second = '';
        for (var i = 0; i < sectionRule.length; i++) {
            if ((sectionRule[i][1] || sectionRule[i][2] === 'o') && (isElementInView(sectionRule[i][0]))) {
                currentElementName.first = String(sectionRule[i][0].id)
                if (animatedElement(sectionRule[i][0], sectionRule[i][1], skill, scrollingY)) {
                    sectionRule[i][1] = false;
                }
                if ((i + 1 < sectionRule.length) && ((sectionRule[i + 1][1] || sectionRule[i + 1][2] === 'o')) &&
                    isElementInView(sectionRule[i + 1][0])) {
                    currentElementName.second = String(sectionRule[i + 1][0].id);
                    if (animatedElement(sectionRule[i + 1][0], sectionRule[i + 1][1], skill, scrollingY)) {
                        sectionRule[i + 1][1] = false;
                    }
                }
                break;
            }
        }
    }

    window.addEventListener('scroll', handler)
})


