function gameFn() {
    'use strict';
    const gameStartEl = document
        .querySelector('.game-start');
    const gameAreaEl = document
        .querySelector('.game-area');
    const gameOverEl = document
        .querySelector('.game-over');
    const gameScoreEl = document
        .querySelector('.game-score');
    const gamePointsEl = gameScoreEl
        .querySelector('.points');

    gameStartEl
        .addEventListener('click', onGameStart);
    gameOverEl
        .addEventListener('click', () => {
            gameOverEl.classList.add('hide');
            clearObjects();
            resetValues();
            onGameStart();
        });

    // Utils
    let keys = {};
    let explosions = [];
    const playerUtils = {
        startX: 150,
        startY: 100,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        lastTimeFiredFireball: 0,
    };
    const gameUtils = {
        speed: 2,
        movingMultiplier: 4,
        fireBallMultiplier: 5,
        bugMultiplier: 3, // temp - 4;
        fireInterval: 1000,
        cloudSpawnInterval: 3000,
        bugSpawnInterval: 800,
        bugKillBonus: 100,
        isActiveGame: true,
    };
    const sceneUtils = {
        score: 0,
        lastCloudSpawn: 0,
        lastBugSpawn: 0,
        cloudSize: 200,
        bugSize: 80,
    };
    let numberOfFrames = 0;

    // On key press
    document
        .addEventListener('keydown', function onKeyDown(e) {
            keys[e.code] = true;
        });
    document
        .addEventListener('keyup', function onKeyUp(e) {
            keys[e.code] = false;
        });

    function gameLoop(timestamp) {
        const wizardEl = document
            .querySelector('.wizard');

        // Increment game score
        if (numberOfFrames++ % 60 == 0) {
            sceneUtils.score++;
        }

        // Remove last explosion
        if (explosions.length && numberOfFrames % 60 == 0) {
            let currExpl = explosions.pop();
            currExpl.remove();
        }

        // Add cloulds
        if (timestamp - sceneUtils.lastCloudSpawn > gameUtils.cloudSpawnInterval + 20000 * Math.random()) {
            renderObject('cloud', timestamp, sceneUtils.cloudSize);
        }

        // Modify clouds positions
        let clouds = gameAreaEl
            .querySelectorAll('.cloud');
        moveFlyingObjects('cloud', clouds, 1);

        // Add bugs
        if (timestamp - sceneUtils.lastBugSpawn > gameUtils.bugSpawnInterval + 5000 * Math.random()) {
            renderObject('bug', timestamp, sceneUtils.bugSize);
        }

        // Modify bugs positions
        let bugs = gameAreaEl
            .querySelectorAll('.bug');
        moveFlyingObjects('bug', bugs, gameUtils.bugMultiplier);

        // Apply gravity
        let isFlying = (playerUtils.y + playerUtils.height) <= gameAreaEl.offsetHeight;
        if (isFlying) {
            playerUtils.y += gameUtils.speed;
        }

        // Process user input
        if (keys.ArrowUp && playerUtils.y > 0) {
            playerUtils.y -= gameUtils.speed * gameUtils.movingMultiplier;
        }
        if (keys.ArrowDown && playerUtils.y + playerUtils.height < gameAreaEl.offsetHeight) {
            playerUtils.y += gameUtils.speed * gameUtils.movingMultiplier;
        }
        if (keys.ArrowLeft && playerUtils.x > 0) {
            playerUtils.x -= gameUtils.speed * gameUtils.movingMultiplier;
        }
        if (keys.ArrowRight && playerUtils.x + playerUtils.width < gameAreaEl.offsetWidth) {
            playerUtils.x += gameUtils.speed * gameUtils.movingMultiplier;
        }

        // Add fireball
        if (keys.Space) {
            wizardEl.classList.add('wizard-fire');

            if (timestamp - playerUtils.lastTimeFiredFireball > gameUtils.fireInterval) {
                renderObject('fire-ball', timestamp);
                playerUtils.lastTimeFiredFireball = timestamp;
            }
        } else {
            wizardEl.classList.remove('wizard-fire');
        }

        // Modify fireballs positions
        let fireBalls = gameAreaEl
            .querySelectorAll('.fire-ball');
        moveFlyingObjects('fire-ball', fireBalls, gameUtils.fireBallMultiplier);

        // Update position
        wizardEl.style.top = playerUtils.y + 'px';
        wizardEl.style.left = playerUtils.x + 'px';

        // Apply score
        gamePointsEl.textContent = sceneUtils.score;

        collisionAction(wizardEl, fireBalls, bugs);

        if (gameUtils.isActiveGame) {
            window.requestAnimationFrame(gameLoop);
        }
    }

    function resetValues() {
        gameUtils.isActiveGame = true;
        sceneUtils.lastBugSpawn = 0;
        sceneUtils.lastCloudSpawn = 0;
        sceneUtils.score = 0;
        playerUtils.lastTimeFiredFireball = 0;
        playerUtils.x = playerUtils.startX;
        playerUtils.y = playerUtils.startY;
    }

    function clearObjects() {
        let wizardEl = gameAreaEl
            .querySelector('.wizard');
        let fireballs = gameAreaEl
            .querySelectorAll('.fire-ball');
        let bugs = gameAreaEl
            .querySelectorAll('.bug');

        wizardEl.remove();
        fireballs.forEach(fb => fb.remove());
        bugs.forEach(b => b.remove());
    }

    function gameOverAction() {
        gameUtils.isActiveGame = false;
        gameOverEl.classList.remove('hide');
    }

    function collisionAction(wizardEl, fireBalls, bugs) {
        bugs.forEach(bug => {
            if (isCollision(wizardEl, bug)) {
                gameOverAction();
                return;
            }

            fireBalls.forEach(fb => {
                if (isCollision(fb, bug)) {
                    sceneUtils.score += gameUtils.bugKillBonus;

                    addExplosion(bug);

                    bug.parentElement.removeChild(bug)
                    fb.parentElement.removeChild(fb);
                }
            });
        });

        function isCollision(firstEl, secondEl) {
            let firstRect = firstEl.getBoundingClientRect();
            let secondRect = secondEl.getBoundingClientRect();

            return !(firstRect.top > secondRect.bottom ||
                firstRect.bottom < secondRect.top ||
                firstRect.right < secondRect.left ||
                firstRect.left > secondRect.right);
        }
    }

    function addExplosion(bug) {
        let explEl = document
            .createElement('div');
        explEl.classList.add('explosion');
        explEl.style.top = bug.style.top;
        explEl.style.left = bug.x + 'px';
        gameAreaEl.appendChild(explEl);

        explosions.push(explEl);
    }

    function moveFlyingObjects(objName, objects, multiplier) {
        let isFireball = objName == 'fire-ball';

        objects.forEach(obj => {
            if (isFireball) {
                obj.x += gameUtils.speed * multiplier;
            } else {
                obj.x -= gameUtils.speed * multiplier;
            }

            obj.style.left = obj.x + 'px';

            let removeCondition = isFireball ?
                obj.x + obj.offsetWidth > gameAreaEl.offsetWidth :
                obj.x + obj.offsetWidth <= 0;

            if (removeCondition) {
                obj.parentElement.removeChild(obj);
            }
        });
    }

    function renderObject(objName, timestamp, size) {
        let objEl = document
            .createElement('div');

        const isFireball = objName == 'fire-ball';

        objEl.style.top = isFireball ?
            (playerUtils.y + playerUtils.height / 3 - 5) + 'px' :
            (gameAreaEl.offsetHeight - size) * Math.random() + 'px';
        objEl.x = isFireball ?
            playerUtils.x + playerUtils.width :
            gameAreaEl.offsetWidth - size;

        objEl.style.left = objEl.x + 'px';
        objEl.classList.add(`${objName}`);

        if (!isFireball) {
            const lastObjectSpawn = objName == 'cloud' ? 'lastCloudSpawn' : 'lastBugSpawn';
            sceneUtils[lastObjectSpawn] = timestamp;
        }

        gameAreaEl.appendChild(objEl);
    }

    function initWizard(wizard) {
        wizard.classList.add('wizard');
        wizard.style.top = playerUtils.y + 'px';
        wizard.style.left = playerUtils.x + 'px';
        gameAreaEl.appendChild(wizard);
    }

    function onGameStart() {
        gameStartEl.classList.add('hide');

        // Render wizard
        const wizardEl = document
            .createElement('div');
        initWizard(wizardEl);

        playerUtils.width = wizardEl.offsetWidth;
        playerUtils.height = wizardEl.offsetHeight;

        // Game infinite loop
        gameLoop();
    }
}