document.getElementById('triangleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const a = parseFloat(document.getElementById('sideA').value);
    const b = parseFloat(document.getElementById('sideB').value);
    const c = parseFloat(document.getElementById('sideC').value);
    
    if (a + b > c && a + c > b && b + c > a) {
        const angles = calculateAngles(a, b, c);
        const triangleTypeBySides = classifyTriangleBySides(a, b, c);
        const triangleTypeByAngles = classifyTriangleByAngles(angles);
        displayResults(a, b, c, angles, triangleTypeBySides, triangleTypeByAngles);

        playSuccessSound();

    } else {
        alert('Los lados no forman un triángulo válido.');
        playFailSound();
    }
});

function calculateAngles(a, b, c) {
    const angleA = Math.acos((b**2 + c**2 - a**2) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a**2 + c**2 - b**2) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB; // Este cálculo es correcto si los ángulos son válidos
    return { angleA, angleB, angleC };
}

function classifyTriangleBySides(a, b, c) {
    if (a === b && b === c) {
        return 'Equilátero';
    } else if (a === b || b === c || a === c) {
        return 'Isósceles';
    } else {
        return 'Escaleno';
    }
}

function classifyTriangleByAngles(angles) {
    const { angleA, angleB, angleC } = angles;
    if (angleA < 90 && angleB < 90 && angleC < 90) {
        return 'Acutángulo';
    } else if (angleA === 90 || angleB === 90 || angleC === 90) {
        return 'Rectángulo';
    } else {
        return 'Obtusángulo';
    }
}

function displayResults(a, b, c, angles, typeBySides, typeByAngles) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Resultados:</h2>
        <p>Lados: A = ${a}, B = ${b}, C = ${c}</p>
        <p>Ángulos: A = ${angles.angleA.toFixed(2)}°, B = ${angles.angleB.toFixed(2)}°, C = ${angles.angleC.toFixed(2)}°</p>
        <p>Tipo de triángulo por lados: ${typeBySides}</p>
        <p>Tipo de triángulo por ángulos: ${typeByAngles}</p>
        <img src="${getTriangleImage(typeBySides)}" alt="${typeBySides}" />
    `;
}


function getTriangleImage(type) {
    switch(type) {
        case 'Equilátero':
            return 'https://www.proferecursos.com/wp-content/uploads/Triangulo-Equilatero-1024x724.jpg'; 
        case 'Isósceles':
            return 'https://www.proferecursos.com/wp-content/uploads/Triangulo-Isosceles-1024x724.jpg'; 
        case 'Escaleno':
            return 'https://www.proferecursos.com/wp-content/uploads/Triangulo-Escaleno-1024x724.jpg'; 
        default:
            return '';
    }

function playSuccessSound() {
        const sound = document.getElementById("success-sound");
        successSound.play();
    }
function playFailSound() {
        const Sound = document.getElementById("fail-sound");
        failSound.play();
    }


}