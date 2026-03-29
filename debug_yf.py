import yfinance as yf
sym = 'RELIANCE.NS'
print('sym', sym)
data = yf.download(sym, period='1y', progress=False)
print('shape', data.shape)
print(data.tail(3))
print('high nan', data['High'].isna().any())
print('close nan', data['Close'].isna().any())
print('recent', data['High'].tail(20).max())
print('current', data['Close'].iloc[-1])
print('compare', data['Close'].iloc[-1] > data['High'].tail(20).max() * 0.98)
