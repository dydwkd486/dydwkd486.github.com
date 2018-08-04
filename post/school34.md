---
layout: default
---

## 컴퓨터그래픽스(1)

### 점을 찍고 선, 면, 색, 회전 시키는 코드

복붙해서 안될수도있음.

필요한 자료가 있어서 코드만 올려 놓았습니다.

자세한것은 나중에 따로 올려놓겠습니다.

<iframe width="1280" height="720" src="https://www.youtube.com/embed/OvRnYHwp_tM?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>



```

#include <gl/glut.h>
#include <gl/gl.h>
#include <gl/glu.h>
#include <stdio.h>
#include <math.h>

#define M_PI 3.14159265358979323846
#define CenterX 300.0f
#define CenterY 300.0f
typedef struct {
	float x;
	float y;
	float z;
} Point;
void InitLight() {
	GLfloat mat_diffuse[] = { 0.5, 0.4, 0.3, 1.0 };
	GLfloat mat_specular[] = { 1.0, 1.0, 1.0, 1.0 };
	GLfloat mat_ambient[] = { 0.5, 0.4, 0.3, 1.0 };
	GLfloat mat_shininess[] = { 50.0 };
	GLfloat light_specular[] = { 1.0, 1.0, 1.0, 1.0 };
	GLfloat light_diffuse[] = { 0.8, 0.8, 0.8, 1.0 };
	GLfloat light_ambient[] = { 0.3, 0.3, 0.3, 1.0 };
	GLfloat light_position[] = { 13, 12, 13.0, 0.0 };
	glShadeModel(GL_SMOOTH); glEnable(GL_LIGHTING); glEnable(GL_LIGHT0);
	glLightfv(GL_LIGHT0, GL_POSITION, light_position);
	glLightfv(GL_LIGHT0, GL_DIFFUSE, light_diffuse);
	glLightfv(GL_LIGHT0, GL_SPECULAR, light_specular);
	glLightfv(GL_LIGHT0, GL_AMBIENT, light_ambient);
	glMaterialfv(GL_FRONT, GL_DIFFUSE, mat_diffuse);
	glMaterialfv(GL_FRONT, GL_SPECULAR, mat_specular);
	glMaterialfv(GL_FRONT, GL_AMBIENT, mat_ambient);
	glMaterialfv(GL_FRONT, GL_SHININESS, mat_shininess);
}

Point cnormal(GLfloat a[3], GLfloat b[3], GLfloat c[3]) {
	Point p, q, r;
	double val;
	p.x = a[0] - b[0]; p.y = a[1] - b[1]; p.z = a[2] - b[2];
	q.x = c[0] - b[0]; q.y = c[1] - b[1]; q.z = c[2] - b[2];
	r.x = p.y*q.z - p.z*q.y;
	r.y = p.z*q.x - p.x*q.z;
	r.z = p.x*q.y - p.y*q.x;
	val = sqrt(r.x*r.x + r.y*r.y + r.z*r.z);
	r.x = r.x / val; r.y = r.y / val; r.z = r.z / val;
	return r;
}

GLfloat vex[100][3];
GLfloat vexr[10000][3];
GLfloat vexrc[10000][3];
GLfloat X1, Y1;
GLint count = 0;
GLint iDiv;
int a = 0;
int control = 0;
int init = 0;
Point normr[1000];
Point normrc[1000];
//가져온거
int moving, begin, beginy;
int scaling = 0;
GLfloat angle = 0; /* in degrees */
GLfloat angley = 0; /* in degrees */
float scalefactor = 1.0;

void MyDisplay() {
	GLint index;
	glClear(GL_COLOR_BUFFER_BIT);
	glDisable(GL_DEPTH_TEST);
	glViewport(0, 0, 600, 600);
	glColor3f(1, 0, 0);
	glPointSize(3.0f);
	for (index = 0; index < count; index++)
	{
		glBegin(GL_POINTS);
		glVertex3f(vex[index][0], vex[index][1], vex[index][2]);
	}
	glEnd();
	//glFlush();
	glutSwapBuffers();
}

void MyDisplay1() {

	GLint index;
	glClear(GL_COLOR_BUFFER_BIT);
	glViewport(0, 0, 600, 600);
	glColor3f(1, 0, 0);
	glPointSize(3.0f);
	for (GLint i = 0; i < iDiv; i++) {
		for (index = 0; index < count; index++)
		{
			glBegin(GL_POINTS);
			glVertex3f(vexr[index + (i * count)][0], vexr[index + (i * count)][1], vexr[index + (i * count)][2]);
			glEnd();
		}
	}
	//glFlush();
	glutSwapBuffers();
}

void MyDisplay2() {
	GLint index; int b=0;
	glClear(GL_COLOR_BUFFER_BIT);
	glDisable(GL_DEPTH_TEST);
	glViewport(0, 0, 600, 600);
	glColor3f(1, 0, 0);
	glPointSize(3.0f);
	glPushMatrix();
	glRotatef(angle, 0.0, 1.0, 0.0);
	for (GLint i = 0; i < iDiv*(count-1) * 2; i++) {
		glBegin(GL_LINE_LOOP);
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glEnd();
	}
	glPopMatrix();
	glutSwapBuffers();
}

void MyDisplay3() {

	GLint index; int b = 0;
	glClear(GL_COLOR_BUFFER_BIT);
	glDisable(GL_DEPTH_TEST);
	glViewport(0, 0, 600, 600);
	glColor3f(1, 0, 0);
	glPointSize(3.0f);
	glPushMatrix();
	glRotatef(angle, 0.0, 1.0, 0.0);
	for (GLint i = 0; i < iDiv*(count - 1) * 2; i++) {
		glBegin(GL_TRIANGLES);
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glEnd();
	}
	glPopMatrix();
	glutSwapBuffers();
}
void MyDisplay4() {

	GLint index;
	Point norm;
	Point norm1;
	Point pong;
	int b=0;
	glClear(GL_COLOR_BUFFER_BIT);
	glClear(GL_DEPTH_BUFFER_BIT);
	glEnable(GL_DEPTH_TEST);
	glMatrixMode(GL_MODELVIEW);
	glEnable(GL_COLOR_MATERIAL);
	glViewport(0, 0, 600, 600);
	glColor3f(1, 1, 0);
	glPointSize(3.0f);

	glPushMatrix();
	glRotatef(angle, 0.0, 1.0, 0.0);
	glRotatef(angley, 1.0, 0.0, 0.0);
	for (GLint i = 0; i < iDiv*(count - 1) * 2; i++) {
		glNormal3f(normr[i].x, normr[i].y, normr[i].z);
		glBegin(GL_TRIANGLES);
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glVertex3f(vexrc[b][0], vexrc[b][1], vexrc[b][2]);
		b++;
		glEnd();
	}
	glPopMatrix();

	glutSwapBuffers();
	glFlush();
}
void Init() {
	if (init == 0) {
		MyDisplay();
	}
	else if (init == 1) {
		MyDisplay1();
	}
	else if (init == 2) {
		MyDisplay2();
	}
	else if (init == 3) {
		MyDisplay3();
	}
	else if (init == 4) {
		MyDisplay4();
	}

}

void MyMainMenu(int entryID)
{
	if (entryID == 1)
	{
		printf("회전 각도를 입력하시오 :");
		scanf_s("%d", &a);
		//a = 60;
		iDiv = 360 / a;
		GLint iPtCnt = count;
		GLint index;
		for (GLint i = 0; i < iDiv; i++) {
			for (index = 0; index < iPtCnt; index++)
			{
				vexr[index + (i*iPtCnt)][0] = cos(a*i*(M_PI / 180))*(vex[index][0]);
				vexr[index + (i*iPtCnt)][1] = vex[index][1];
				vexr[index + (i*iPtCnt)][2] = sin(a*i*(M_PI / 180))*(vex[index][0]);
			}
		}
		init = 1;
		Init();

	}
	else if (entryID == 2)
	{
		int a= 0;
		int c1 = 0;
		Point norm;
		GLint iPtCnt = count;
		GLint index;
		for (GLint i = 0; i < iDiv - 1; i++) {
			for (index = 0; index < (iPtCnt - 1); index++)
			{

			vexrc[a][0]=	vexr[index + (i * iPtCnt)][0];
			vexrc[a][1] = vexr[index + (i * iPtCnt)][1];
			vexrc[a++][2] = vexr[index + (i * iPtCnt)][2];

			vexrc[a][0] = vexr[index + (i * iPtCnt) + iPtCnt][0];
			vexrc[a][1]=vexr[index + (i * iPtCnt) + iPtCnt][1];
			vexrc[a++][2] = vexr[index + (i * iPtCnt) + iPtCnt][2];

				vexrc[a][0] = vexr[index + (i * iPtCnt) + iPtCnt + 1][0];
				vexrc[a][1]=vexr[index + (i * iPtCnt) + iPtCnt + 1][1];
				vexrc[a++][2] = vexr[index + (i * iPtCnt) + iPtCnt + 1][2];

				normr[c1++] = cnormal(vexrc[a - 1], vexrc[a - 2], vexrc[a - 3]);

				vexrc[a][0] = vexr[index + (i * iPtCnt)][0];
				vexrc[a][1] = vexr[index + (i * iPtCnt)][1];
				vexrc[a++][2] = vexr[index + (i * iPtCnt)][2];

				vexrc[a][0] = vexr[index + (i * iPtCnt) + iPtCnt + 1][0];
				vexrc[a][1] = vexr[index + (i * iPtCnt) + iPtCnt + 1][1];
				vexrc[a++][2] = vexr[index + (i * iPtCnt) + iPtCnt + 1][2];

				vexrc[a][0] = vexr[index + (i * iPtCnt) + 1][0];
				vexrc[a][1]=vexr[index + (i * iPtCnt) + 1][1];
				vexrc[a++][2] = vexr[index + (i * iPtCnt) + 1][2];

				normr[c1++] = cnormal(vexrc[a - 1], vexrc[a - 2], vexrc[a - 3]);
			}
		}
		for (index = 0; index < iPtCnt - 1; index++) {
			vexrc[a][0] = vexr[(iDiv - 1)*iPtCnt + index][0];
			vexrc[a][1] = vexr[(iDiv - 1)*iPtCnt + index][1];
			vexrc[a++][2] = vexr[(iDiv - 1)*iPtCnt + index][2];

			vexrc[a][0] = vexr[index][0];
			vexrc[a][1] = vexr[index][1];
			vexrc[a++][2] = vexr[index][2];

			vexrc[a][0] = vexr[index + 1][0];
			vexrc[a][1] = vexr[index + 1][1];
			vexrc[a++][2] = vexr[index + 1][2];

			normr[c1++] = cnormal(vexrc[a - 1], vexrc[a - 2], vexrc[a - 3]);


			vexrc[a][0] = vexr[(iDiv - 1)*iPtCnt + index][0];
			vexrc[a][1] = vexr[(iDiv - 1)*iPtCnt + index][1];
			vexrc[a++][2] = vexr[(iDiv - 1)*iPtCnt + index][2];

			vexrc[a][0] = vexr[index + 1][0];
			vexrc[a][1] = vexr[index + 1][1];
			vexrc[a++][2] = vexr[index + 1][2];

			vexrc[a][0] = vexr[(iDiv - 1)*iPtCnt + index + 1][0];
			vexrc[a][1] = vexr[(iDiv - 1)*iPtCnt + index + 1][1];
			vexrc[a++][2] = vexr[(iDiv - 1)*iPtCnt + index + 1][2];

			normr[c1++] = cnormal(vexrc[a - 1], vexrc[a - 2], vexrc[a - 3]);
		}
		control = 1;
		init = 2;
		Init();

	}

	else if (entryID == 3) {
		control = 1;
		init = 3;
		Init();
	}
	else if (entryID == 4) {
		control = 1;
		init = 4;
		Init();

	}
	else if (entryID == 5) {
		control = 0;
		a = 0;
		count = 0;
		init = 4;
		glutPostRedisplay();
	}


}
void MyReshape(int NewWidth, int NewHeight)
{

	// 뷰포트 설정
	glViewport(0, 0, NewWidth, NewHeight);
	glLoadIdentity();
	glOrtho(-300.0, 300.0, -300.0, 300.0, -300.0, 300.0);
}

void MyMouseClick(GLint Button, GLint State, GLint X, GLint Y)
{
	// 마우스의 왼쪽버튼이 클릭되었을 때
	if (Button == GLUT_LEFT_BUTTON && State == GLUT_DOWN&&control == 0)
	{
		vex[count][0] = X - 300;
		vex[count][1] = 300 - Y;
		vex[count][2] = 0.0;
		count++;
		MyDisplay();       // 마우스가 클릭될 때마다 다시 그려줌
	}
	if (Button == GLUT_LEFT_BUTTON && State == GLUT_DOWN&&control == 1) {
		moving = 1; begin = X; beginy = Y;
	}
	if (Button == GLUT_LEFT_BUTTON && State == GLUT_UP) {
		moving = 0;
	}
}

void motion(GLint x, GLint y)
{
	if (moving) {
		angle = angle + (x - begin); begin = x;
		glutPostRedisplay();
	}
	if (moving) {
		angley = angley + (y - beginy); beginy = y;
		glutPostRedisplay();
	}
}

int main(int argc, char** argv) {

	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB | GLUT_DEPTH);
	glutInitWindowSize(600, 600);
	glutInitWindowPosition(0, 0);
	glutCreateWindow("만든당");
	glClearColor(1.0, 1.0, 1.0, 1.0);
	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glutDisplayFunc(Init);
	glutReshapeFunc(MyReshape);
	glutMouseFunc(MyMouseClick);
	glutMotionFunc(motion);
	GLint MyMainMenuID = glutCreateMenu(MyMainMenu);
	glutAddMenuEntry("회전 시키기", 1);
	glutAddMenuEntry("삼각형 구현", 2);
	glutAddMenuEntry("색 입히기", 3);
	glutAddMenuEntry("빛 추가 제거", 4);
	glutAddMenuEntry("처음부터 만들기", 5);
	glutAttachMenu(GLUT_RIGHT_BUTTON);
	InitLight();
	glutMainLoop();
	return 0;
}
```
