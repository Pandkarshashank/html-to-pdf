import random
from tkinter import *

class coins:
    def __init__(self):
        self.coin = False
        self.face = 'NoFace'
        self.choices = []
    def randomize(self):
        for i in range(random.randint(0,100000)):
            self.choices.append(random.choice([1,0]))
    def toss(self):
        self.coin = random.choice(self.choices)
    def setFace(self):
        if self.coin:
            self.face = 'Heads'
        else:
            self.face = 'Tails'
    def put(self):
        return 'Its '+self.face+'!!!'

class CustomTkinter(Frame):
    def __init__(self, master=None):
        super().__init__(master,  bg='#212121')
        self.master = master
        self.master.geometry('400x200')
        self.master.configure(bg='#212121')
        self.master.title('Custom Tkinter')
        self.create_widgets()

    def create_widgets(self):
        self.label =Label(self.master, text="Lets Toss A Coin",font=("Arial", 18), fg='#f5f5f5', bg='#212121')
        self.label.pack(pady=30)

        self.button_frame = Frame(self.master,  bg='#212121')
        self.button_frame.pack(pady=10)

        self.btn = Button(self.button_frame, text="Toss", command=self.tossCoin, bg='#fbc02d', fg='#212121', font=("Arial", 14))
        self. btn.pack(side=LEFT, padx=10, ipadx=10)

        self.close = Button(self.button_frame, text="Close", command=self.close,  bg='#26a69a', fg='#f5f5f5', font=("Arial", 14))
        self.close.pack(side=LEFT, padx=10, ipadx=10)

    def tossCoin(self):
        coin = coins()
        coin.randomize()
        coin.toss()    
        coin.setFace()
        res = coin.put()
        self.label.config(text=res)
        self.label.configure(bg='#fbc02d', fg='#212121')
        self.label.config(font=("Arial", 22, "bold"))
        self.label.after(100, lambda: self.label.config(bg='#212121', fg='#f5f5f5', font=("Arial", 18)))

    def close(self):
     self.master.destroy()

root = Tk()
app = CustomTkinter(master=root)
app.mainloop()


