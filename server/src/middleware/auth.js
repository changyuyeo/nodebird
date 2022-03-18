export const isLoggedIn = (req, res, next) => {
	req.isAuthenticated()
		? next()
		: res.status(401).json({ message: '로그인이 필요합니다.' })
}

export const isNotLoggedIn = (req, res, next) => {
	!req.isAuthenticated()
		? next()
		: res.status(401).json({ message: '로그인이 필요합니다.' })
}
