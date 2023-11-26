window.onload = () => {
    const validate_name = (name) => {
        let isValid = true;

        if (name === null || name === "" || typeof name !== "string") {
            isValid = false;
        }

        let re = /^[a-z ,.'-]+$/i;
        if (re.test(name) == false) {
            isValid = false;
        }

        return isValid;
    }

    const validate_email = (email) => {
        let isValid = true;

        if (email === null || email === "" || typeof email !== "string") {
            isValid = false;
        }

        let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (re.test(email) == false) {
            isValid = false;
        }

        return isValid;
    }

    function refunc() {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;

        const url = "mudfoot.doc.stu.mmu.ac.uk/node/api/mailinglist";
        const data = {
            "name": name,
            "email": email
        };

        fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    throw "Bad data was sent to the server";
                } else {
                    throw "Something went wrong";
                }
            })
            .then((resJson) => {
                document.getElementById("formResponse").innerHTML = resJson["Email"] + " has subscribed";
                document.getElementById("formResponse").classList = "success";
            })
            .catch((error) => {
                document.getElementById("formResponse").innerHTML = error;
                document.getElementById("formResponse").classList = "error";
            })

        console.log(name, email);
        e.preventDefault();
    };

};