export default class AuthController {
    static async logIn(req, res) {
	const token = req.get('X-Token')
	res.status(200);
    }

    static async signUp(req, res) {
	const token = req.get('X-Token');
	const { name, username, password, email, phoneNumber } = req.body
	res.status(200);
    }

    static async logOut(req, res) {
	res.status(200);
    }
}
