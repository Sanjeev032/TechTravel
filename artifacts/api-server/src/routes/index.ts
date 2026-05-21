import { Router, type IRouter } from "express";
import healthRouter from "./health";
import navbarRouter from "./navbar";
import heroRouter from "./hero";
import aboutRouter from "./about";
import servicesRouter from "./services";
import projectsRouter from "./projects";
import testimonialsRouter from "./testimonials";
import blogsRouter from "./blogs";
import technologiesRouter from "./technologies";
import teamRouter from "./team";
import contactRouter from "./contact";
import footerRouter from "./footer";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(navbarRouter);
router.use(heroRouter);
router.use(aboutRouter);
router.use(servicesRouter);
router.use(projectsRouter);
router.use(testimonialsRouter);
router.use(blogsRouter);
router.use(technologiesRouter);
router.use(teamRouter);
router.use(contactRouter);
router.use(footerRouter);
router.use(statsRouter);

export default router;
